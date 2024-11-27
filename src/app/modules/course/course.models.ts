import { model, Schema } from 'mongoose';
import { ICourses, ICoursesModels } from './course.interface';
const coursesSchema = new Schema<ICourses>(
  {
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
    videos: [
      {
        url: {
          type: String,
          default: 'null',
        },
        title: {
          type: String,
          default: 'null',
        },
        key: {
          type: String,
          default: 'null',
        },
      },
    ],
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

coursesSchema.pre('find', function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

coursesSchema.pre('findOne', function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

coursesSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Courses = model<ICourses, ICoursesModels>('courses', coursesSchema);
export default Courses;
