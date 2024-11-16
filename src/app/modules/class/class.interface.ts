import { Types } from "mongoose";

export type IClass = {
  name: string;
  startTime: string;
  endTime: string;
  days: DaysOfWeek;
  trainer: Types.ObjectId;
  trainees: [Types.ObjectId];
  max_capacity: number;
};

export enum DaysOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
