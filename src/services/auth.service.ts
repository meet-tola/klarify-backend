import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";

export const registerUserService = async (body: { email: string; name: string; password: string }) => {
  const { email, name, password } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const user = new UserModel({ email, name, password });

    await user.save({ session });

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
