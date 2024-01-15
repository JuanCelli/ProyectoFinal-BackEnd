import { Router } from "express";
import { authSession } from "../middleware/authSession.js";

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

router.get("/",authSession,(req,res)=>{
    const user = req.session.user
    res.render("profile",{
        title:"Perfil",
        user,
        role:req.session.role
    })
})


export default router