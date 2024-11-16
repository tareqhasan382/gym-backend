import { Schema, model } from "mongoose";
import { DaysOfWeek, IClass } from "./class.interface";

const classSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
    days: {
      type: String,
      required: true,
      enum: Object.values(DaysOfWeek),
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    max_capacity: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export const ClassModel = model<IClass>("Class", classSchema);
