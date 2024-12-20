import { z } from 'zod';
// User login validation Schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'User email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
export const AuthValidation = {
  loginValidationSchema,
};
