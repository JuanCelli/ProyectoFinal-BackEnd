import { Router } from "express";
import { getRoleUser } from "../middleware/getRoleUser.js";
import passport from "passport";


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

        req.session.user = req.user
        res.json({msj: "Bienvenido, has ingreseado correctamente."})
    } catch (error) {
        res.json({error: error})

    }
})

//Register
router.post("/logout",(req,res)=>{
	req.session.destroy(error=>{
		if(error){
			res.json({error:"error logout", msg:"error al cerrar session"})
		}
		res.send("Session cerrada correctamente.")
    })
})


//Login y register con GitHub
router.get("/github-login",passport.authenticate("github",{ scope: ['user:email'] }))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/api/sessions/fail-login"}), getRoleUser, async(req,res)=>{
    try {
        req.session.user = req.user
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