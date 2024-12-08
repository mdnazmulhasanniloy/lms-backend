
import httpStatus from 'http-status';
import { ICupon } from './cupon.interface';
import Cupon from './cupon.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';

const createCupon = async (payload: ICupon) => {
  const result = await Cupon.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create cupon');
  }
  return result;
};

const getAllCupon = async (query: Record<string, any>) => {
  const cuponModel = new QueryBuilder(Cupon.find(), query)
    .search([])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await cuponModel.modelQuery;
  const meta = await cuponModel.countTotal();

  return {
    data,
    meta,
  };
};

const getCuponById = async (id: string) => {
  const result = await Cupon.findById(id);
  if (!result) {
    throw new Error('Cupon not found!');
  }
  return result;
};

const updateCupon = async (id: string, payload: Partial<ICupon>) => {
  const result = await Cupon.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Cupon');
  }
  return result;
};

const deleteCupon = async (id: string) => {
  const result = await Cupon.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete cupon');
  }
  return result;
};

export const cuponService = {
  createCupon,
  getAllCupon,
  getCuponById,
  updateCupon,
  deleteCupon,
};