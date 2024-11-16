import {
  DeleteResponse,
  ILoginResponse,
  ILoginUser,
  IUser,
} from "./user.interface";
import { UserModel } from "./user.model";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const user = await UserModel.create(payload);
  return user;
};
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginResponse | null> => {
  // create access token
  const accessToken = jwt.sign(
    {
      userId: payload._id,
      email: payload.email,
      role: payload.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: "15d",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: payload._id,
      email: payload.email,
      role: payload.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: "15d",
    }
  );

  return {
    refreshToken,
    accessToken,
  };
};
const getAllUsers = async (): Promise<IUser[] | null> => {
  const user = await UserModel.find({ role: { $ne: "ADMIN" } });
  return user;
};
const singleUser = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findById(id);
  return user;
};
const editUser = async (
  id: string,
  upData: Partial<IUser>
): Promise<IUser | null> => {
  const { fullName, email } = upData;
  const result = await UserModel.findByIdAndUpdate(
    id,
    { fullName, email },
    { new: true }
  );
  return result;
};
const deleteUser = async (id: string): Promise<DeleteResponse> => {
  const user = await UserModel.deleteOne({ _id: id });
  return user;
};

export const userService = {
  createUser,
  loginUser,
  getAllUsers,
  singleUser,
  editUser,
  deleteUser,
};
