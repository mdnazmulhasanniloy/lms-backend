import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { myVideosService } from './myCourse.service';
import sendResponse from '../../utils/sendResponse';

const createMyVideos = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req?.user?.userId;
  const result = await myVideosService.createMyVideos(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My video created successfully',
    data: result,
  });
});

const getAllMyVideos = catchAsync(async (req: Request, res: Response) => {
  const query: Record<string, any> = { ...req.query };
  query['user'] = req?.user?.userId;
  const result = await myVideosService.getAllMyVideos(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My videos fetched successfully',
    data: result,
  });
});

const getMyVideosById = catchAsync(async (req: Request, res: Response) => {
  const result = await myVideosService.getMyVideosById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My video fetched successfully',
    data: result,
  });
});

const updateMyVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await myVideosService.updateMyVideos(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My video updated successfully',
    data: result,
  });
});

const deleteMyVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await myVideosService.deleteMyVideos(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My video deleted successfully',
    data: result,
  });
});

export const myVideosController = {
  createMyVideos,
  getAllMyVideos,
  getMyVideosById,
  updateMyVideos,
  deleteMyVideos,
};
