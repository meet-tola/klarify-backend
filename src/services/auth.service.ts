import mongoose from "mongoose";
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

    const user = new UserModel({ ...body, verificationCode });
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

  if (!user) {
    throw new NotFoundException("User not found for the given account");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return { user: user.omitPassword() };  // No token returned
};

export const confirmVerificationCodeService = async (email: string, code: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundException("User not found");

  if (user.verificationCode !== code) throw new UnauthorizedException("Invalid verification code");

  user.isActive = true;
  user.verificationCode = undefined;
  await user.save();

  return { user: user.omitPassword() };
};