import httpStatus from 'http-status';
import { IBlogs } from './blogs.interface';
import Blogs from './blogs.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { uploadToS3 } from '../../utils/s3';

const createBlogs = async (payload: IBlogs) => {
  const result = await Blogs.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create blogs');
  }
  return result;
};

const getAllBlogs = async (query: Record<string, any>) => {
  const blogsModel = new QueryBuilder(Blogs.find(), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await blogsModel.modelQuery;
  const meta = await blogsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getBlogsById = async (id: string) => {
  const result = await Blogs.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blogs not found!');
  }
  return result;
};

const updateBlogs = async (id: string, payload: Partial<IBlogs>) => {
  const result = await Blogs.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Blogs');
  }
  return result;
};

const deleteBlogs = async (id: string) => {
  const result = await Blogs.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete blogs');
  }
  return result;
};

export const blogsService = {
  createBlogs,
  getAllBlogs,
  getBlogsById,
  updateBlogs,
  deleteBlogs,
};
