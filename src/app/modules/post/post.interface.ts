import { ObjectId } from 'mongoose';
import { Model } from 'mongoose';
import { IUser } from './../user/user.interface';

export interface IPost {
  user: ObjectId | IUser;
  title: string;
  description: string;
  image: string; 
}

export type IPostModules = Model<IPost, Record<string, unknown>>;
