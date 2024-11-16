import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ClassModel } from "./class.model";
import { sendResponse } from "../../../shared/sendResponse";
import { DaysOfWeek, IClass } from "./class.interface";
import { StatusCodes } from "http-status-codes";
const createClass = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const existingSchedules = await ClassModel.find({ days: data.days });
    if (existingSchedules.length >= 5) {
      return sendResponse<IClass>(res, {
        statusCode: 400,
        success: false,
        message: "Maximum of 5 class schedules allowed..!!",
      });
    }
    // Validate 2-hour duration
    const start = new Date(`1970-01-01T${data.startTime}:00Z`);
    const end = new Date(`1970-01-01T${data.endTime}:00Z`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (duration !== 2) {
      return sendResponse<IClass>(res, {
        statusCode: 400,
        success: false,
        message: "Each class schedule must last 2 hours..!!",
      });
    }
    // Validate overlappingSchedule
    const overlappingSchedule = await ClassModel.findOne({
      days: data.days,
      startTime: data.startTime,
    });
    if (overlappingSchedule) {
      return sendResponse<IClass>(res, {
        statusCode: 400,
        success: false,
        message: "Schedule already exists for this time on this day..!!",
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

    const { id, traineeId } = req.body; //

    const classToBook = await ClassModel.findById(id); //.populate("trainee s");

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
      classToBook.trainees.some((trainee) => trainee.toString() === traineeId)
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
      { $push: { trainees: traineeId } },
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
