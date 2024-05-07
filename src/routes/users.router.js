import { Router } from "express";
import { changePasswordUser, deleteInactiveUsers, deleteUser, generateTokenToResetPassword, getUsers, sendEmailWithLinkToResetPassword, switchRoleUser } from "../controllers/user.controller.js";
import { passportCall } from "../passport/passportCall.js";



const router = Router()

router.post("/change-password/:idToken",changePasswordUser)

router.post("/create-token-reset-password/:id",generateTokenToResetPassword)

router.post("/send-mail",sendEmailWithLinkToResetPassword)

router.put("/premium/:id",switchRoleUser)

router.get("/", passportCall("current",{},["admin"]),getUsers)

router.delete("/",deleteInactiveUsers)

router.delete("/:id", deleteUser)


export default router