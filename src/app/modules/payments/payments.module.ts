import { model, Schema, Types } from 'mongoose';
import { IPayments, IPaymentsModules } from './payments.interface';

const paymentsSchema = new Schema<IPayments>(
  {
    enrollment: {
      type: Types.ObjectId,
      ref: 'Enrollments',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    tranId: {
      type: String,
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Payments = model<IPayments, IPaymentsModules>('Payments', paymentsSchema);
export default Payments;
