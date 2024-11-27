import { model, Query, Schema, Types } from 'mongoose'; 
import { IMyCourse, IMyCoursesModel } from './myCourse.interface';

const myCoursesSchema = new Schema<IMyCourse>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Types.ObjectId,
      ref: 'courses',
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    tranId: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

myCoursesSchema.pre('find', function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

myCoursesSchema.pre('findOne', function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

myCoursesSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const MyCourses = model<IMyCourse, IMyCoursesModel>('MyCourses', myCoursesSchema);

export default MyCourses;
