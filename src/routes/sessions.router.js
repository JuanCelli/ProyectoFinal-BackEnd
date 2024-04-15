import { Router } from "express";
import { getRoleUser } from "../middleware/getRoleUser.js";
import passport from "passport";
import { register,login,logout,githubCallback } from "../controllers/sessions.controller.js";
import { passportCall } from "../passport/passportCall.js";


const router = Router()
// Register
router.post("/register",passport.authenticate("register",{failureRedirect:"/api/sessions/fail-register"}),register)


// Login
router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/fail-login"}),getRoleUser,login)

// router.post("/logout",(req,res)=>{
//     try {
//         res.clearCookie('jwtCookieToken');
//         res.json({ msj: "Has cerrado sesión correctamente." });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })
// router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/fail-login"}),getRoleUser,login)

//Logout
router.post("/logout",logout)

router.get("/current",passportCall("current"),(req,res)=>{
    try {
        console.log(req.user)
        return res.status(200).json({currentUser: req.user})
    } catch (error) {
        res.json({error: error})
    }
})

//Login y register con GitHub
router.get("/github-login",passport.authenticate("github",{ scope: ['user:email'] }))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/api/sessions/fail-login"}), getRoleUser, githubCallback)

//Error de login
router.get("/fail-login", (req,res)=>{
    res.status(401).send({error:"No ha podido ingresar con éxito."})
})

//Error de register
router.get("/fail-register", (req,res)=>{
    res.status(400).send({error:"No ha podido registrar con éxito."})
})

export default router