import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// Validation Request function
const validationRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, resizeBy, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
export default validationRequest;
