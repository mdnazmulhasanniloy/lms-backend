import { Model, ObjectId } from 'mongoose';
import { ICourses } from '../course/course.interface';
import { IUser } from '../user/user.interface';

export interface IEnrollments {
  _id?: string;
  course: ObjectId | ICourses;
  user: ObjectId | IUser;
  isPaid: boolean;
  couponCode?: string;
  amount: number;
  tranId: string;
  isDeleted: boolean;
}

export type IEnrollmentsModules = Model<IEnrollments, Record<string, unknown>>;
