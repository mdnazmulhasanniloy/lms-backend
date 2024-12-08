
import { Model } from 'mongoose';

export interface ICopun {}

export type ICopunModules = Model<ICopun, Record<string, unknown>>;