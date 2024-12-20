/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  name: string,
  email: string,
  passoword: string,
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
