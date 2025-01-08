import { model, Schema, Types } from 'mongoose';
import { IEnrollments, IEnrollmentsModules } from './enrollments.interface';

const enrollmentsSchema = new Schema<IEnrollments>(
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
    amount: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      default: null,
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

const Enrollments = model<IEnrollments, IEnrollmentsModules>(
  'Enrollments',
  enrollmentsSchema,
);
export default Enrollments;
