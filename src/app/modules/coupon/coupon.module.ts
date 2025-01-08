import { model, Schema } from 'mongoose';
import { ICoupon, ICouponModules } from './coupon.interface';

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    expiresAt: { type: String, required: true }, 
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
); 

const Coupon = model<ICoupon, ICouponModules>('Coupon', couponSchema);
export default Coupon;
