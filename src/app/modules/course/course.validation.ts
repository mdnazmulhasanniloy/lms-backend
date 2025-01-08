import { z } from 'zod';

const createVideosZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title cannot be empty' }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description cannot be empty' }), 
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number' })
      .optional(),
  }),
});

export const videosValidator = {
  createVideosZodSchema,
};
