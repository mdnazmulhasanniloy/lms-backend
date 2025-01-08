import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { enrollmentsService } from './enrollments.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createEnrollments = catchAsync(async (req: Request, res: Response) => {
  req.body['user'] = req?.user?.userId;
  const result = await enrollmentsService.createEnrollments(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Enrollments created successfully',
    data: result,
  });
});

const getAllEnrollments = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentsService.getAllEnrollments(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All enrollments fetched successfully',
    data: result,
  });
});
const getMyEnrollments = catchAsync(async (req: Request, res: Response) => {
  req.query['user'] = req.user.userId;
  const result = await enrollmentsService.getAllEnrollments(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My enrollments fetched successfully',
    data: result,
  });
});

const getEnrollmentsById = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentsService.getEnrollmentsById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrollments fetched successfully',
    data: result,
  });
});
const updateEnrollments = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentsService.updateEnrollments(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrollments updated successfully',
    data: result,
  });
});

const deleteEnrollments = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentsService.deleteEnrollments(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrollments deleted successfully',
    data: result,
  });
});

export const enrollmentsController = {
  createEnrollments,
  getAllEnrollments,
  getEnrollmentsById,
  updateEnrollments,
  deleteEnrollments,
  getMyEnrollments,
};
