
import { model, Schema } from 'mongoose';
import { IVideos, IVideosModules } from './videos.interface';

const videosSchema = new Schema<IVideos>(
  {
    title: {
      type: String,
      required: true,
    },
  video:{
      type: String,
      required: true,
    },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

 

const Videos = model<IVideos, IVideosModules>(
  'Videos',
  videosSchema
);
export default Videos;