import { Types } from 'mongoose';

export type TAdmin = {
  id: Types.ObjectId,
  email: string,
  role: string,
  iat: Date,
  exp: Date,
};
