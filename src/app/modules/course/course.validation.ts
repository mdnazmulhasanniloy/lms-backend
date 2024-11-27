import { z } from 'zod';

const createVideosZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title cannot be empty' }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description cannot be empty' }),

    links: z
      .array(
        z.object({
          title: z.string({ required_error: 'Title is required' }),
          url: z
            .string({ required_error: 'Video link is required' })
            .url('Invalid URL format'),
        }),
      )
      .optional(),

    priceType: z.enum(['free', 'premium'], {
      required_error: 'priceType is required',
    }),
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number' })
      .optional(),
  }),
});

export const videosValidator = {
  createVideosZodSchema,
};
