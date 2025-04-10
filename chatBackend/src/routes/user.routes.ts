import { Router } from "express";
import { chat, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/user.controllers";
import zodSchemaValidator from "../middlewares/zodSchemaValidator.middleware";
import { loginZodValidator, registerZodValidator } from "../ZodSchemaTypes/ZodAuthValidator";
import auth from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router =Router();

router.route("/register").post(zodSchemaValidator(registerZodValidator),userRegister);
router.route("/login").post(zodSchemaValidator(loginZodValidator),userLogin);
router.route("/logout").post(auth,userLogout);
router.route("/update-profile").put(auth,upload.single("image"),updateUserProfile);


router.route("/").post(chat);

export default router;