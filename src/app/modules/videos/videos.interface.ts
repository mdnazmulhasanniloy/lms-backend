import { Model, ObjectId } from 'mongoose';

export interface IVideos {
  _id?: string;
  title: string;
  video: string;
  course: ObjectId;
  isDeleted: boolean;
}

export type IVideosModules = Model<IVideos, Record<string, unknown>>;
