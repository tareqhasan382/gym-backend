import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ClassModel } from "./class.model";
import { sendResponse } from "../../../shared/sendResponse";
import { IClass } from "./class.interface";
import { StatusCodes } from "http-status-codes";
import { ExtractDate } from "../../../utils/ExtractDate";

const createClass = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const classDate = ExtractDate(data.date_time);
    // console.log("classDate:", classDate);
    // Count how many classes are scheduled for this day
    const existingClasses = await ClassModel.countDocuments({
      date_time: {
        $gte: new Date(`${classDate}T00:00:00Z`),
        $lt: new Date(`${classDate}T23:59:59Z`),
      },
    });
    // console.log("existingClasses:", existingClasses);
    if (existingClasses >= 5) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: `Cannot schedule more than 5 classes on ${classDate}.`,
      });
    }
    const result = await ClassModel.create(data);
    sendResponse<IClass>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Class created successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Class creation failed..!!",
      data: error instanceof Error ? error.message : error,
    });
  }
});
const allClass = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await ClassModel.find();
    sendResponse<IClass[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Class retrive successfully..!!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Class retrive failed..!!",
      data: error instanceof Error ? error.message : error,
    });
  }
});
// class/{class_id}/book
const bookClass = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || !user.userId) {
      return sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    const { id } = req.params;

    const classToBook = await ClassModel.findById(id); //.populate("trainees");

    if (!classToBook) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Class not found",
      });
    }
    // console.log("classToBook:", classToBook);
    //console.log("userID:", user.userId);
    if (classToBook.trainees.length >= classToBook.max_capacity) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Class is already at full capacity",
      });
    }

    // Avoid duplicate booking
    // (classToBook.trainees.some((trainee) => console.log("trainee:", trainee)),
    if (
      classToBook.trainees.some((trainee) => trainee.toString() === user.userId)
    ) {
      return sendResponse(res, {
        statusCode: StatusCodes.CONFLICT,
        success: false,
        message: "You are already booked for this class",
      });
    }

    // Add the user as a trainee
    const result = await ClassModel.findByIdAndUpdate(
      id,
      { $push: { trainees: user.userId } },
      { new: true }
    );

    sendResponse<IClass>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Class booked successfully!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Class booking failed!",
      data: error instanceof Error ? error.message : error,
    });
  }
});

export const classControoler = { createClass, bookClass, allClass };
