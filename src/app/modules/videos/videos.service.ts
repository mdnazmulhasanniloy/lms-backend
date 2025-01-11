import httpStatus from 'http-status';
import { IVideos } from './videos.interface';
import Videos from './videos.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';

const createVideos = async (payload: IVideos) => {
  const result = await Videos.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create videos');
  }
  return result;
};

const getAllVideos = async (query: Record<string, any>) => {
  const videosModel = new QueryBuilder(Videos.find({ isDeleted: false }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await videosModel.modelQuery;
  const meta = await videosModel.countTotal();

  return {
    data,
    meta,
  };
};
 

const getVideosById = async (id: string) => {
  const result = await Videos.findById(id);
  if (!result || result?.isDeleted) {
    throw new Error('Videos not found!');
  }
  return result;
};

const updateVideos = async (id: string, payload: Partial<IVideos>) => {
  const result = await Videos.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Videos');
  }
  return result;
};

const deleteVideos = async (id: string) => {
  const result = await Videos.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete videos');
  }
  return result;
};

export const videosService = {
  createVideos,
  getAllVideos,
  getVideosById,
  updateVideos,
  deleteVideos,
};
