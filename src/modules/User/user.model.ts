import { model, Schema } from 'mongoose';
import { TUser, User } from './user.interface';
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
    password: {
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

UserSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.password_secure),
  );
  next();
});

// Match Password in database that your provided
UserSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
UserSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password'); // + for get all user fileds
};
export const UserModel = model<TUser, User>('Users', UserSchema);
