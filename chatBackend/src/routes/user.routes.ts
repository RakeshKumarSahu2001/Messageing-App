import { Router } from "express";
import { chat, userLogin, userRegister } from "../controllers/user.controllers";
import zodSchemaValidator from "../middlewares/zodSchemaValidator.middleware";
import { loginZodValidator, registerZodValidator } from "../ZodSchemaTypes/ZodAuthValidator";
import auth from "../middlewares/auth.middleware";

const router =Router();

router.route("/register").post(zodSchemaValidator(registerZodValidator),userRegister);
router.route("/login").post(zodSchemaValidator(loginZodValidator),userLogin);

router.route("/").post(auth,chat);

export default router;