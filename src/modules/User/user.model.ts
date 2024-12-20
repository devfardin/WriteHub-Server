import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email Address is Required'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'User Role is Required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not Assignable to user',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const UserModel = model<TUser>('Users', UserSchema);
