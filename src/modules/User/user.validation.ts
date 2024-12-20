import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string(),
    password: z.string(),
    role: z.boolean(),
    isBlocked: z.boolean(),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
