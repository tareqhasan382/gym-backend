import express from "express";

import { authVerify } from "../../middlewares/authVerify";
import { trainerControoler } from "./trainer.controller";
import { USER_Role } from "../users/user.constants";

const router = express.Router();

router.post("/", authVerify(USER_Role.ADMIN), trainerControoler.createTrainer);
router.get(
  "/schedule",
  authVerify(USER_Role.TRAINER),
  trainerControoler.trainerSchedule
);

export const TrainerRoutes = router;
