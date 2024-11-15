import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { TrainerRoutes } from "../modules/trainer/trainer.route";
import { ClassRoutes } from "../modules/class/class.route";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/trainer", TrainerRoutes);
router.use("/class", ClassRoutes);

export default router;
