import { Router } from "express";
import { userRegister } from "../controllers/user.controllers";

const router =Router();

router.route("/register").post(userRegister)

export default router;