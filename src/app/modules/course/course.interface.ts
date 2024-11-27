import { Model, ObjectId } from 'mongoose';

export interface ICourses {
  links: string[];
  id: string;
  _id: string;
  title: string;
  description: string;
  banner: string;
  videos: { url: string; key: string , title:string}[];
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
