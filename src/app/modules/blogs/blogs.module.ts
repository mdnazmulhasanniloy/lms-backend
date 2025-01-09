import { model, Schema } from 'mongoose';
import { IBlogs, IBlogsModules } from './blogs.interface';

const blogsSchema = new Schema<IBlogs>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Blogs = model<IBlogs, IBlogsModules>('Blogs', blogsSchema);
export default Blogs;
