import httpStatus from 'http-status';
import { IPayments } from './payments.interface';
import Payments from './payments.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import generateRandomString from '../../utils/generateRandomString';
import { IEnrollments } from '../enrollments/enrollments.interface';
import Enrollments from '../enrollments/enrollments.module';
import { IUser } from '../user/user.interface';
import { createCheckoutSession } from './payments.utils';

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
  console.log(query);
  return query;
};

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
