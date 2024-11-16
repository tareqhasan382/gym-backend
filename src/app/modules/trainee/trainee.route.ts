import express from "express";

import { authVerify } from "../../middlewares/authVerify";

import { USER_Role } from "../users/user.constants";
import { traineeControoler } from "./trainee.controller";

const router = express.Router();

router.post(
  "/",
  authVerify(USER_Role.TRAINER),
  traineeControoler.createTrainee
);

router.get("/all", authVerify(USER_Role.TRAINER), traineeControoler.allTrainee);
export const TraineeRoutes = router;
