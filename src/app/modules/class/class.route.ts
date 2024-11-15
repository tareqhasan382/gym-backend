import express from "express";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../users/user.constants";
import { classControoler } from "./class.controller";

const router = express.Router();

router.post(
  "/create",
  authVerify(USER_Role.ADMIN),
  classControoler.createClass
);
router.post("/:id", authVerify(USER_Role.TRAINEE), classControoler.bookClass);
router.get("/", classControoler.allClass);
// /class/{class_id}/book

export const ClassRoutes = router;
