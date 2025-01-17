import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { ICourses } from './course.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import Courses from './course.models';
import generateRandomString from '../../utils/generateRandomString';

const createCourse = async (payload: ICourses) => {
  payload.id = generateRandomString(5);
  const result = await Courses.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'video creation failed');
  }
  return result;
};

const getAllCourse = async (query: Record<string, any>) => {
  const videosModel = new QueryBuilder(Courses.find(), query)
    .search(['title', "id", ])
    .filter()
    .paginate()
    .sort();

  const data: any = await videosModel.modelQuery;
  const meta = await videosModel.countTotal();
  return {
    data,
    meta,
  };
};

const getCourseById = async (id: string) => {
  const result = await Courses.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'videos not found');
  }
  return result;
}; 

const updateCourse = async (id: string, payload: Partial<ICourses>) => {
  const result = await Courses.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'course update failed');
  }

  return result;
};

const deleteCourses = async (id: string) => {
  const result = await Courses.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'delete course failed');
  }

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourses, 
};
