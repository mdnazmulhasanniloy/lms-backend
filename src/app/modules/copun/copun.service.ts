
import httpStatus from 'http-status';
import { ICopun } from './copun.interface';
import Copun from './copun.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';

const createCopun = async (payload: ICopun) => {
  const result = await Copun.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create copun');
  }
  return result;
};

const getAllCopun = async (query: Record<string, any>) => {
  const copunModel = new QueryBuilder(Copun.find(), query)
    .search([])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await copunModel.modelQuery;
  const meta = await copunModel.countTotal();

  return {
    data,
    meta,
  };
};

const getCopunById = async (id: string) => {
  const result = await Copun.findById(id);
  if (!result) {
    throw new Error('Copun not found!');
  }
  return result;
};

const updateCopun = async (id: string, payload: Partial<ICopun>) => {
  const result = await Copun.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Copun');
  }
  return result;
};

const deleteCopun = async (id: string) => {
  const result = await Copun.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete copun');
  }
  return result;
};

export const copunService = {
  createCopun,
  getAllCopun,
  getCopunById,
  updateCopun,
  deleteCopun,
};