import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean(),
  }),
});

export const BlogValidation = {
  blogValidationSchema,
};
