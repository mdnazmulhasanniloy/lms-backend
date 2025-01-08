import { Model, ObjectId } from 'mongoose';

export interface ICourses { 
  id: string;
  _id: string;
  title: string;
  description: string;
  banner: string;
  isPublished: boolean;
  price: number;
  sell: number;
  reviews: ObjectId[];
  avgRating: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export type ICoursesModels = Model<ICourses, Record<string, unknown>>;
