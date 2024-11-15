import { Types } from "mongoose";

export type IClass = {
  date_time: Date;
  trainer: Types.ObjectId;
  trainees: [Types.ObjectId];
  max_capacity: number;
};
