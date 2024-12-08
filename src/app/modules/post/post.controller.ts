
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';  
import { postService } from './post.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createPost = catchAsync(async (req: Request, res: Response) => {
 const result = await postService.createPost(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post created successfully',
    data: result,
  });

});

const getAllPost = catchAsync(async (req: Request, res: Response) => {

 const result = await postService.getAllPost(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All post fetched successfully',
    data: result,
  });

});

const getPostById = catchAsync(async (req: Request, res: Response) => {
 const result = await postService.getPostById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post fetched successfully',
    data: result,
  });

});
const updatePost = catchAsync(async (req: Request, res: Response) => {
const result = await postService.updatePost(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });

});


const deletePost = catchAsync(async (req: Request, res: Response) => {
 const result = await postService.deletePost(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });

});

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};