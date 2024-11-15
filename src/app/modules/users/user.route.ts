import express from "express";
import { userControoler } from "./user.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "./user.constants";
const router = express.Router();

router.post("/registration", userControoler.createUser);
router.post("/login", userControoler.loginUser);
router.get("/", userControoler.allUser); //authVerify(USER_Role.TRAINEE)
router.get("/:id", authVerify(USER_Role.TRAINEE), userControoler.singleUser);
router.patch("/:id", authVerify(USER_Role.TRAINEE), userControoler.editUser);
router.delete("/:id", authVerify(USER_Role.TRAINER), userControoler.deleteUser);

export const UserRoutes = router;
