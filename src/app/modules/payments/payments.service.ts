import httpStatus from 'http-status';
import { IPayments } from './payments.interface';
import Payments from './payments.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import generateRandomString from '../../utils/generateRandomString';
import { IEnrollments } from '../enrollments/enrollments.interface';
import Enrollments from '../enrollments/enrollments.module';
import { IUser } from '../user/user.interface';
import { createCheckoutSession, validatePayment } from './payments.utils';
import { startSession } from 'mongoose';

const initPayment = async (payload: any) => {
  let paymentData;
  const enrollments: IEnrollments | null = await Enrollments.findById(
    payload?.enrollments,
  ).populate(['course', 'user']);

  if (!enrollments) {
    throw new AppError(httpStatus.NOT_FOUND, 'enrollment not found');
  }
  const tranId = generateRandomString(10);
  const isPaymentHave = await Payments.findOne({
    enrollment: enrollments._id,
    user: enrollments?.user,
    isPaid: false,
  });

  if (!isPaymentHave) {
    paymentData = await Payments.create({
      enrollment: enrollments._id,
      user: (enrollments?.user as IUser)?._id,
      amount: enrollments?.amount,
      tranId,
    });
  } else {
    paymentData = await Payments.findByIdAndUpdate(isPaymentHave?._id, {
      tranId,
    });
  }

  if (!paymentData) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create payment',
    );
  }

  const data = {
    total_amount: paymentData?.amount,
    tran_id: paymentData?.tranId,
    cus_name: (enrollments.user as IUser)?._id,
    cus_email: (enrollments.user as IUser)?.email,
    cus_add1: (enrollments.user as IUser)?.address ?? 'online',
    cus_phone: (enrollments.user as IUser)?.phoneNumber ?? '01518963455',
    student: payload.student,
  };

  // const paymentSessionData: IPayment = {
  //   amount: payload.amount,
  //   student: payload.student,
  //   tranId: tranId,
  //   id: tranId,
  // };

  // await Payment.create(paymentSessionData);

  const paymentSession = await createCheckoutSession(data);
  console.log(payload);
  if (!paymentSession.redirectGatewayURL) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to initiate payment');
  }
  return paymentSession.redirectGatewayURL;
};

const webhook = async (query: Record<string, any>) => {
  const session = await startSession();
  session.startTransaction();

  try {
    if (query?.status !== 'VALID') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid payment');
    }

    const result = await validatePayment(query);
    if (result.status !== 'VALID') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Payment validation failed');
    }

    const { tran_id, tran_date, card_type } = result;

    // Update payment record
    const payment = await Payments.findOneAndUpdate(
      { tranId: tran_id },
      {
        isPaid: true,
        tranDate: tran_date,
        paymentMethod: card_type,
        paymentGatewayData: query,
      },
      { new: true, session },
    );

    if (!payment) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Payment update failed');
    }

    // Update enrollment record
    const enrollments = await Enrollments.findByIdAndUpdate(
      payment?.enrollment,
      {
        isPaid: true,
        tranId: tran_id,
      },
      { new: true, session },
    ).populate([
      { path: 'user', select: 'name email phoneNumber image' },
      { path: 'course' },
    ]);

    if (!enrollments) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Enrollment update failed');
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Payment processed successfully' };
  } catch (error: any) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();

    // Refund the payment if an error occurred after marking it as paid
    // if (query?.status === 'VALID' && query?.tran_id) {
    //   try {
    //     await refundPayment(
    //       query.tran_id,
    //       query.amount,
    //       query.reason || 'System error',
    //     );
    //   } catch (refundError) {
    //     console.error('Refund failed:', refundError);
    //     throw new AppError(
    //       httpStatus.INTERNAL_SERVER_ERROR,
    //       'Payment processing failed, and refund attempt was unsuccessful',
    //     );
    //   }
    // }

    // Throw the original error
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error?.message || 'An unexpected error occurred',
    );
  }
};

// const webhook = async (query: Record<string, any>) => {
//   if (query?.status !== 'VALID') {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Invalid payment Payment');
//   }
//   const result = await validatePayment(query);
//   if (result.status !== 'VALID') {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Payment Failed');
//   }
//   const { tran_id, tran_date, card_type } = result;
//   const payment = await Payments.findOneAndUpdate(
//     {
//       tranId: tran_id,
//     },
//     {
//       isPaid: true,
//       tranDate: tran_date,
//       paymentMethod: card_type,
//       paymentGatewayData: query
//     },
//     { new: true },
//   );

//   if (!payment) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Payment update failed');
//   }
//   const enrollments = await Enrollments.findByIdAndUpdate(payment?.enrollment, {
//     isPaid: true,
//     tranId: tran_id,
//   }).populate([
//     { path: 'user', select: 'name email phoneNumber image' },
//     { path: 'course' },
//   ]);
// };

const createPayments = async (payload: IPayments) => {
  const result = await Payments.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create payments');
  }
  return result;
};

const getAllPayments = async (query: Record<string, any>) => {
  const paymentsModel = new QueryBuilder(
    Payments.find({ isDeleted: false }),
    query,
  )
    .search([''])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await paymentsModel.modelQuery;
  const meta = await paymentsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getPaymentsById = async (id: string) => {
  const result = await Payments.findById(id);
  if (!result || result?.isDeleted) {
    throw new Error('Payments not found!');
  }
  return result;
};

const updatePayments = async (id: string, payload: Partial<IPayments>) => {
  const result = await Payments.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Payments');
  }
  return result;
};

const deletePayments = async (id: string) => {
  const result = await Payments.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete payments');
  }
  return result;
};

export const paymentsService = {
  createPayments,
  getAllPayments,
  getPaymentsById,
  updatePayments,
  deletePayments,
  initPayment,
  webhook,
};
