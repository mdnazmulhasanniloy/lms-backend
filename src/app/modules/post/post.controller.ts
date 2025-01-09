import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { postService } from './post.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createPost = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = await uploadToS3({
      file: req.file,
      fileName: `images/user/profile/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  req.body.user = req?.user?.userId;
  const result = await postService.createPost(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPost(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All posts fetched successfully',
    data: result,
  });
});

const getMyPosts = catchAsync(async (req: Request, res: Response) => {
  req.query['user'] = req.user.userId;
  const result = await postService.getAllPost(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My posts fetched successfully',
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
  if (req?.file) {
    req.body.image = await uploadToS3({
      file: req.file,
      fileName: `images/user/profile/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }
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
  getMyPosts,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
