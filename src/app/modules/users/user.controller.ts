import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import { DeleteResponse, ILoginResponse, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import { UserModel } from "./user.model";

const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "User Created Failed..!!",
      data: error,
    });
  }
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isUserExist = await UserModel.findOne(
    { email },
    { password: 1, role: 1, fullName: 1 }
  );

  if (!isUserExist) {
    sendResponse<ILoginResponse>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "User does not exist",
      data: null,
    });
    return;
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    sendResponse<ILoginResponse>(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Password is incorrect",
      data: null,
    });
    return;
  }
  const result = await userService.loginUser(isUserExist);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", result?.refreshToken, cookieOptions);

  if (result?.refreshToken) {
    delete result?.refreshToken;
  }

  sendResponse<ILoginResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged successfully..!!",
    data: result,
  });
});

const allUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users fetch successfully..!!",
    data: result,
  });
});
const singleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.singleUser(id);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetch successfully..!!",
    data: result,
  });
});
const editUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return;
  }
  const { id } = req.params;
  const upData = req.body;

  const result = await userService.editUser(id, upData);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetch successfully..!!",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return;
  }
  const id = req.params.id;
  const result = await userService.deleteUser(id);

  sendResponse<DeleteResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully..!!",
    data: result,
  });
});
export const userControoler = {
  createUser,
  loginUser,
  allUser,
  singleUser,
  editUser,
  deleteUser,
};
