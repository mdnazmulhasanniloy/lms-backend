import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseService } from './course.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.banner = await uploadToS3({
      file: req.file,
      fileName: `images/course/banner/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }
  const result = await CourseService.createCourse(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourse(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getCourseById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.banner = await uploadToS3({
      file: req.file,
      fileName: `images/course/banner/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  const result = await CourseService.updateCourse(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

 
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.deleteCourses(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'course deleted successfully',
    data: result,
  });
});

export const videosController = {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse, 
};
