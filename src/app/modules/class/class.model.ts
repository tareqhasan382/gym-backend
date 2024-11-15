import { Schema, model } from "mongoose";
import { IClass } from "./class.interface";

const classSchema = new Schema<IClass>(
  {
    date_time: { type: Date, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    max_capacity: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export const ClassModel = model<IClass>("Class", classSchema);
