import { model, Schema } from 'mongoose';
import { ICourses, ICoursesModels } from './course.interface';
const coursesSchema = new Schema<ICourses>(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Review',
        },
      ],
      default: [],
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    sell: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Courses = model<ICourses, ICoursesModels>('courses', coursesSchema);
export default Courses;
