import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { blogsService } from './blogs.service';
import sendResponse from '../../utils/sendResponse';
import { uploadToS3 } from '../../utils/s3';

const createBlogs = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = await uploadToS3({
      file: req.file,
      fileName: `images/blogs/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  const result = await blogsService.createBlogs(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blogs created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogsService.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All blogs fetched successfully',
    data: result,
  });
});

const getBlogsById = catchAsync(async (req: Request, res: Response) => {
  const result = await blogsService.getBlogsById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});
const updateBlogs = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = await uploadToS3({
      file: req.file,
      fileName: `images/blogs/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  const result = await blogsService.updateBlogs(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs updated successfully',
    data: result,
  });
});

const deleteBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogsService.deleteBlogs(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs deleted successfully',
    data: result,
  });
});

export const blogsController = {
  createBlogs,
  getAllBlogs,
  getBlogsById,
  updateBlogs,
  deleteBlogs,
};
