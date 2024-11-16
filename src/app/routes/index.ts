import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { TrainerRoutes } from "../modules/trainer/trainer.route";
import { ClassRoutes } from "../modules/class/class.route";
import { TraineeRoutes } from "../modules/trainee/trainee.route";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/trainer", TrainerRoutes);
router.use("/class", ClassRoutes);
router.use("/trainee", TraineeRoutes);

export default router;
