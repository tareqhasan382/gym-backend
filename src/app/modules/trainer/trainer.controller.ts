import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../users/user.model";
import { IUser } from "../users/user.interface";
import { ClassModel } from "../class/class.model";
import { IClass } from "../class/class.interface";

const createTrainer = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await UserModel.findByIdAndUpdate(
      data?.id,
      { role: "TRAINER" },
      { new: true }
    );

    if (!result) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Trainer created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Trainer creation failed..!!",
      data: error instanceof Error ? error.message : error,
    });
  }
});

const trainerSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.FORBIDDEN,
      success: false,
      message: "Unauthorized access.",
      data: null,
    });
    return;
  }
  const result = await ClassModel.find({ trainer: user.userId });

  sendResponse<IClass[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class fetch successfully..!!",
    data: result,
  });
});
const allTrainer = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserModel.find({ role: "TRAINER" });

    if (!result) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "TRAINER not found",
        data: null,
      });
    }

    sendResponse<IUser[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Trainer retrive successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Trainer retrive failed..!!",
      data: error instanceof Error ? error.message : error,
    });
  }
});
export const trainerControoler = {
  createTrainer,
  trainerSchedule,
  allTrainer,
};
