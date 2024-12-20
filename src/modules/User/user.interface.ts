/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string,
  email: string,
  password: string,
  role: string,
  isBlocked: boolean,
};
export interface User extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

// Create a user role type
export type TUserRole = keyof typeof USER_ROLE;
