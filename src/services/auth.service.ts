import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { sendVerificationEmail } from "../utils/mailer";

export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) throw new BadRequestException("Email already exists");

    // Generate verification code (no hashing)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new UserModel({ ...body, verificationCode }); // Store plain text code
    await user.save({ session });

    await sendVerificationEmail(user.email, verificationCode);

    await session.commitTransaction();
    session.endSession();

    return { user: user.omitPassword() };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const verifyUserService = async (email: string, password: string) => {
  const user = (await UserModel.findOne({ email })) as UserDocument;
  if (!user) throw new NotFoundException("User not found for the given account");
  
  try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new UnauthorizedException("Invalid email or password");
  } catch (error) {
    throw error;
  }

  return { user: user.omitPassword() };
};

export const confirmVerificationCodeService = async (
  userId: string,
  code: string
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  if (user.verificationCode !== code) {
    throw new UnauthorizedException("Invalid verification code");
  }

  user.verificationCode = undefined;
  await user.save();

  return { user: user.omitPassword() };
};

export const resendVerificationCodeService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  // Generate new verification code (no hashing)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode; // Store plain text code
  await user.save();

  await sendVerificationEmail(user.email, verificationCode);

  return { message: "Verification code resent successfully" };
};

export const resetPasswordService = async (
  userId: string,
  newPassword: string
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  user.password = newPassword;
  await user.save();

  return { message: "Password reset successfully" };
};