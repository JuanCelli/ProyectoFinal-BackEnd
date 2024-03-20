import { Router } from "express";
import { changePasswordUser, generateTokenToResetPassword, sendEmailWithLinkToResetPassword, switchRoleUser } from "../controllers/user.controller.js";


const router = Router()

router.post("/change-password/:idToken",changePasswordUser)

router.post("/create-token-reset-password/:id",generateTokenToResetPassword)

router.post("/send-mail",sendEmailWithLinkToResetPassword)

router.put("/premium/:id",switchRoleUser)






export default router