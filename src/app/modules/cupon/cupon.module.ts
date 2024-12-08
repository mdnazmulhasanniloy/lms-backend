
import { model, Schema } from 'mongoose';
import { ICupon, ICuponModules } from './cupon.interface';

const cuponSchema = new Schema<ICupon>(
  {
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  }
);

cuponSchema.pre('find', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

cuponSchema.pre('findOne', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

cuponSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Cupon = model<ICupon, ICuponModules>(
  'Cupon',
  cuponSchema
);
export default Cupon;