import httpStatus from 'http-status';
import { ICoupon } from './coupon.interface';
import Coupon from './coupon.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import generateRandomString from '../../utils/generateRandomString';

const createCoupon = async (payload: ICoupon) => {
  payload.code = generateRandomString(12);
  const result = await Coupon.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create coupon');
  }
  return result;
};

const getAllCoupon = async (query: Record<string, any>) => {
  const couponModel = new QueryBuilder(Coupon.find({ isDeleted: false }), query)
    .search([''])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await couponModel.modelQuery;
  const meta = await couponModel.countTotal();

  return {
    data,
    meta,
  };
};

const getCouponById = async (id: string) => {
  const result = await Coupon.findById(id);
  if (!result || result?.isDeleted) {
    throw new Error('Coupon not found!');
  }
  return result;
};

const updateCoupon = async (id: string, payload: Partial<ICoupon>) => {
  const result = await Coupon.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Coupon');
  }
  return result;
};

const deleteCoupon = async (id: string) => {
  const result = await Coupon.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete coupon');
  }
  return result;
};

export const couponService = {
  createCoupon,
  getAllCoupon,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
