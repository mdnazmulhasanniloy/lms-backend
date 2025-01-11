import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { videosService } from './videos.service';
import sendResponse from '../../utils/sendResponse';
import { uploadToS3 } from '../../utils/s3';

const createVideos = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.video = await uploadToS3({
      file: req.file,
      fileName: `videos/course/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }
  const result = await videosService.createVideos(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Videos created successfully',
    data: result,
  });
});

const getAllVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await videosService.getAllVideos(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All videos fetched successfully',
    data: result,
  });
});
const getVideosByCourseIdId = catchAsync(
  async (req: Request, res: Response) => {
    req.query.course = req?.params?.courseId;
    const result = await videosService.getAllVideos(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course wise videos fetched successfully',
      data: result,
    });
  },
);

const getVideosById = catchAsync(async (req: Request, res: Response) => {
  const result = await videosService.getVideosById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Videos fetched successfully',
    data: result,
  });
});
const updateVideos = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.video = await uploadToS3({
      file: req.file,
      fileName: `videos/course/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }
  const result = await videosService.updateVideos(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Videos updated successfully',
    data: result,
  });
});

const deleteVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await videosService.deleteVideos(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Videos deleted successfully',
    data: result,
  });
});

export const videosController = {
  createVideos,
  getAllVideos,
  getVideosById,
  updateVideos,
  deleteVideos,
  getVideosByCourseIdId,
};
