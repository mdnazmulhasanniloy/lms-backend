import { Model, ObjectId } from 'mongoose';
import { IEnrollments } from '../enrollments/enrollments.interface';
import { IUser } from '../user/user.interface';

export interface IPayments {
  enrollment: ObjectId | IEnrollments;
  user: ObjectId | IUser;
  amount: number;
  tranId: string;
  tranDate: string;
  paymentMethod: string;
  paymentGatewayData: JSON;
  isPaid: boolean;
  isDeleted: boolean;
}

export type IPaymentsModules = Model<IPayments, Record<string, unknown>>;
