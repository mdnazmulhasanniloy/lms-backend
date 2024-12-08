
import { Model } from 'mongoose';

export interface IPost {}

export type IPostModules = Model<IPost, Record<string, unknown>>;