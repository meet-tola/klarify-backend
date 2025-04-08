import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import UserModel, { UserDocument } from "../models/user.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "../emails/mailer";
import { config } from "../config/app.config";

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
    await sendWelcomeEmail(user.email, user.name || "User"); 
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
  user.verificationCode = verificationCode; 
  await user.save();

  await sendVerificationEmail(user.email, verificationCode);

  return { message: "Verification code resent successfully" };
};

export const requestPasswordResetService = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) return;

  const name = user.name || "User"; 

  const resetToken = uuidv4();
  const resetTokenExpiry = new Date(Date.now() + 3600000);
  
  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  // Send email with reset link
  const resetUrl = `${config.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendPasswordResetEmail(user.email, name, resetUrl);
};

export const validatePasswordResetTokenService = async (token: string) => {
  const user = await UserModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    throw new UnauthorizedException("Invalid or expired password reset token");
  }

  return true;
};

export const completePasswordResetService = async (token: string, newPassword: string) => {
  const user = await UserModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    throw new UnauthorizedException("Invalid or expired password reset token");
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
};