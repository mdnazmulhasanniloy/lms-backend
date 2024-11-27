import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { ICourses } from '../course/course.interface';
import Courses from '../course/course.models';
import { IMyCourse } from './myCourse.interface';
import MyCourses from './myCourse.models';

const createMyCourse = async (payload: IMyCourse) => {
  const isExist = await MyCourses.findOne({
    course: payload.course,
    user: payload.user,
    isDeleted: false,
  });
  if (isExist)
    throw new AppError(httpStatus.CONFLICT, 'this course already exists');

  const course: ICourses | null = await Courses.findById(payload.course);
  if (!course) throw new AppError(httpStatus.BAD_REQUEST, 'course not found!');

  const result = (await MyCourses.create(payload)).populate('course');
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'course parses failed');
  }
  return result;
};

const getAllMyCourse = async (query: Record<string, any>) => {
  const myVideosModel = new QueryBuilder(
    MyCourses.find().populate(['user', 'course']),
    query,
  )
    .search([])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await myVideosModel.modelQuery;
  const meta = await myVideosModel.countTotal();
  return {
    data,
    meta,
  };
};

const getMyCourseById = async (id: string) => {
  const result = await MyCourses.findById(id).populate(['user', 'course']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found');
  }
  return result;
};

const updateMyCourse = async (id: string, payload: Partial<IMyCourse>) => {
  const result = await MyCourses.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'course updating failed');
  }
  return result;
};

const deleteMyCourse = async (id: string) => {
  const result = await MyCourses.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course deleting failed');
  }
  return result;
};

export const myVideosService = {
  createMyCourse,
  getAllMyCourse,
  getMyCourseById,
  updateMyCourse,
  deleteMyCourse,
};
