
import { Model } from 'mongoose';

export interface ICoupon {
  _id?: string;
  code: string;
  discount: number;
  isPublished: boolean;
  expiresAt: string;
  isDeleted?: boolean;
}

export type ICouponModules = Model<ICoupon, Record<string, unknown>>;