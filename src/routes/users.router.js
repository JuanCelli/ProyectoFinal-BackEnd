import { Router } from "express";
import { changePasswordUser, generateTokenToResetPassword, sendEmailWithLinkToResetPassword } from "../controllers/user.controller.js";


const router = Router()

router.post("/change-password/:id",changePasswordUser)

router.post("/create-token-reset-password/:id",generateTokenToResetPassword)

router.post("/send-mail/",sendEmailWithLinkToResetPassword)







export default router