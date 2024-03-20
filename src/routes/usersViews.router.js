import { Router } from "express";
import { authSession } from "../middleware/authSession.js";
import { passportCall } from "../passport/passportCall.js";

const router = Router()

router.get("/register",(req,res)=>{
    res.render("register",{
        title:"Registro",
    })
})

router.get("/login",(req,res)=>{
    res.render("login",{
        title:"Login",
    })
})
router.get("/reset-password/:idToken",(req,res)=>{
    res.render("resetPassword",{
        title:"Reestablecer contraseña",
    })
})
router.get("/form-mail",(req,res)=>{
    res.render("formEmailResetPassword",{
        title:"Reestablecer contraseña",
    })
})

router.get("/",passportCall("current",{failureRedirect: '/users/login'}),(req,res)=>{
    res.render("profile",{
        title:"Perfil",
        user: req.user
    })
})


export default router