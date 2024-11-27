import { Model, ObjectId } from "mongoose"; 
import { IUser } from "../user/user.interface";
import { ICourses } from "../course/course.interface";

export interface IMyCourse {
    _id?: string;
    course: ObjectId | ICourses,
    user:ObjectId | IUser,
    isPaid:boolean
    tranId:string
    isDeleted:boolean
}

export type IMyCoursesModel = Model<IMyCourse, Record<string, unknown>>;