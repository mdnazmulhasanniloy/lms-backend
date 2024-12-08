
import { model, Schema } from 'mongoose';
import { ICopun, ICopunModules } from './copun.interface';

const copunSchema = new Schema<ICopun>(
  {
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  }
);

copunSchema.pre('find', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

copunSchema.pre('findOne', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

copunSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Copun = model<ICopun, ICopunModules>(
  'Copun',
  copunSchema
);
export default Copun;