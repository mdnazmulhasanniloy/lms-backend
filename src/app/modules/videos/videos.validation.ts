import { z } from 'zod';

const createVideoZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    course: z.string({
      required_error: 'Course ID is required',
    }),
  }),
});
const updateVideoZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Title is required',
      }),
      course: z.string({
        required_error: 'Course ID is required',
      }),
    })
    .deepPartial(),
});


export const videoValidator = {
    createVideoZodSchema,
    updateVideoZodSchema,
  
}