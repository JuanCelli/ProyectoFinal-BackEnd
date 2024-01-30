import { Router } from "express";
import { getRoleUser } from "../middleware/getRoleUser.js";
import passport from "passport";
import { generateToken } from "../utils/generateToken.js";
import { passportCall } from "../passport/passportCall.js";

const router = Router()
// Register
router.post("/register",passport.authenticate("register",{failureRedirect:"/api/sessions/fail-register"}),async(req,res)=>{
    try {
        res.status(201).json({msj: "Usuario registrado con éxito."})
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
})


// Login
router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/fail-login"}),getRoleUser,async(req,res)=>{
    try {
        const userToken = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        const access_token = generateToken(userToken);

        res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 600000,
            httpOnly: true
        }
        
        )
        res.status(200).json({msj: "Bienvenido, has ingreseado correctamente."})
    } catch (error) {
        res.json({error: error})
    }
})

router.post("/logout",(req,res)=>{
    try {
        res.clearCookie('jwtCookieToken');
        res.json({ msj: "Has cerrado sesión correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/current",passportCall("current"),(req,res)=>{
    try {
        res.send({currentUser: req.user})
    } catch (error) {
        res.json({error: error})
    }
})

//Login y register con GitHub
router.get("/github-login",passport.authenticate("github",{ scope: ['user:email'] }))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/api/sessions/fail-login"}), getRoleUser, async(req,res)=>{
    try {
        const userToken = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        const access_token = generateToken(userToken);

        res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 600000,
            httpOnly: true
        })
        res.redirect("/products")
    } catch (error) {
        console.log(error)
    }
})

//Error de login
router.get("/fail-login", (req,res)=>{
    res.status(401).send({error:"No ha podido ingresar con éxito."})
})

//Error de register
router.get("/fail-register", (req,res)=>{
    res.status(400).send({error:"No ha podido registrar con éxito."})
})

export default router