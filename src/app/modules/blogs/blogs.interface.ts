import { Model } from 'mongoose';

export interface IBlogs {
  _id?: string;
  image: string;
  title: string;
  description: string;
}

export type IBlogsModules = Model<IBlogs, Record<string, unknown>>;
