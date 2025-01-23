import { Router } from "express";
import auth from "../middlewares/auth.middleware";
import { getFriendList, getMessage,sendMessage } from "../controllers/message.controllers";


const router=Router();

router.route("/get-users").get(auth,getFriendList);
router.route("/user/:id").get(auth,getMessage);
router.route("/send-message/:id").post(auth,sendMessage);

export default router;