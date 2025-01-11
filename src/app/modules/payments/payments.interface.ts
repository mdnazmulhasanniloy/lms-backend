import { Model, ObjectId } from 'mongoose';
import { IEnrollments } from '../enrollments/enrollments.interface';
import { IUser } from '../user/user.interface';

export interface IPayments {
  enrollment: ObjectId | IEnrollments;
  user: ObjectId | IUser;
  amount: number;
  tranId: string;
  isPaid: boolean;
  isDeleted: boolean;
}

export type IPaymentsModules = Model<IPayments, Record<string, unknown>>;
