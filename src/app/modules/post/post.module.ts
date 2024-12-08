import { model, Schema, Types } from 'mongoose';
import { IPost, IPostModules } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true, // User id is required in the post d cument.
    },
    title: {
      type: String,
      required: true, // Title of the post is required in the post document.
    },

    description: {
      type: String,
      required: true, // Description of the post is required in the post document.
    },
    image: {
      type: String, // Image of the post is required in the post document.
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.pre('find', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('findOne', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Post = model<IPost, IPostModules>('Post', postSchema);
export default Post;
