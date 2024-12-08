
import { Model } from 'mongoose';

export interface ICupon {}

export type ICuponModules = Model<ICupon, Record<string, unknown>>;