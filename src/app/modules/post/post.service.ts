import httpStatus from 'http-status';
import { IPost } from './post.interface';
import Post from './post.module';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';

const createPost = async (payload: IPost) => {
  const result = await Post.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create post');
  }
  return result;
};

const getAllPost = async (query: Record<string, any>) => {
  const postModel = new QueryBuilder(
    Post.find().populate([
      { path: 'user', select: 'name email _id role image' },
    ]),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await postModel.modelQuery;
  const meta = await postModel.countTotal();

  return {
    data,
    meta,
  };
};

const getPostById = async (id: string) => {
  const result = await Post.findById(id);
  if (!result) {
    throw new Error('Post not found!');
  }
  return result;
};

const updatePost = async (id: string, payload: Partial<IPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Post');
  }
  return result;
};

const deletePost = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete post coupon code ',
    );
  }
  return result;
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
