import httpStatus from 'http-status';
import { IEnrollments } from './enrollments.interface';
import Enrollments from './enrollments.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import Courses from '../course/course.models';
import Coupon from './../coupon/coupon.module';

const createEnrollments = async (payload: IEnrollments) => {
  // Fetch the course
  const course = await Courses.findById(payload.course);
  console.log(course);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // Check if the course is already taken and paid
  const existingEnrollment = await Enrollments.findOne({
    course: payload.course,
    user: payload.user,
  });

  if (existingEnrollment) {
    if (existingEnrollment.isPaid) {
      throw new AppError(httpStatus.CONFLICT, 'This course is already taken');
    }
    // Return the unpaid enrollment if it exists
    return existingEnrollment;
  }

  // Handle coupon code if provided
  if (payload.couponCode) {
    const coupon = await Coupon.findOne({
      code: payload.couponCode,
      isDeleted: false,
    });

    if (!coupon) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid coupon code');
    }

    // Apply discount
    const discountAmount = (course.price * coupon.discount) / 100;
    payload.amount = course.price - discountAmount;
  } else {
    // No coupon, set full price
    payload.amount = course.price;
  }

  // Create the enrollment
  const result = await Enrollments.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create enrollment');
  }

  return result;
};

const getAllEnrollments = async (query: Record<string, any>) => {
  const enrollmentsModel = new QueryBuilder(
    Enrollments.find({ isDeleted: false }).populate([
      { path: 'user', select: 'name email phoneNumber image' },
      { path: 'course' },
    ]),
    query,
  )
    .search([''])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await enrollmentsModel.modelQuery;
  const meta = await enrollmentsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getEnrollmentsById = async (id: string) => {
  const result = await Enrollments.findById(id).populate([
    { path: 'user', select: 'name email phoneNumber image' },
    { path: 'course' },
  ]);
  if (!result || result.isDeleted) {
    throw new Error('enrolment found not found!');
  }
  return result;
};

const updateEnrollments = async (
  id: string,
  payload: Partial<IEnrollments>,
) => {
  const result = await Enrollments.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new Error('Failed to update Enrollments');
  }
  return result;
};

const deleteEnrollments = async (id: string) => {
  const result = await Enrollments.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete enrollments');
  }
  return result;
};

export const enrollmentsService = {
  createEnrollments,
  getAllEnrollments,
  getEnrollmentsById,
  updateEnrollments,
  deleteEnrollments,
};
