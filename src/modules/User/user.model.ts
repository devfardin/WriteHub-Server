import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';
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
    passoword: {
      type: String,
      required: [true, 'Password is Required'],
      trim: true,
      select: 0,
    },
    role: {
      type: String,
      required: [true, 'User Role is Required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not Assignable to user',
      },
      select: 0,
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.passoword = await bcrypt.hash(
    user.passoword,
    Number(config.password_secure),
  );
  next();
});

export const UserModel = model<TUser>('Users', UserSchema);
