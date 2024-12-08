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
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

couponSchema.pre('find', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

couponSchema.pre('findOne', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

couponSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Coupon = model<ICoupon, ICouponModules>('Coupon', couponSchema);
export default Coupon;
