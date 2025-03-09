import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel, { UserDocument } from "../models/user.model";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";
import { sendVerificationEmail } from "../utils/mailer";

export const registerUserService = async (body: { email: string; name: string; password: string }) => {
  const { email } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) throw new BadRequestException("Email already exists");

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(verificationCode, 10);

    const user = new UserModel({ ...body, verificationCode: hashedCode });
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

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthorizedException("Invalid email or password");

  return { user: user.omitPassword() };
};

export const confirmVerificationCodeService = async (userId: string, code: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  const isMatch = await bcrypt.compare(code, user.verificationCode || "");
  if (!isMatch) throw new UnauthorizedException("Invalid verification code");

  user.verificationCode = undefined; // Remove code after verification
  await user.save();

  return { user: user.omitPassword() };
};

export const resendVerificationCodeService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = await bcrypt.hash(verificationCode, 10);
  await user.save();

  await sendVerificationEmail(user.email, verificationCode);

  return { message: "Verification code resent successfully" };
};

export const resetPasswordService = async (userId: string, newPassword: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  user.password = newPassword;
  await user.save();

  return { message: "Password reset successfully" };
};
