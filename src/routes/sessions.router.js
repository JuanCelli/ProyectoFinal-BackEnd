import { Router } from "express";
import { userManagerMongo } from "../daos/managers/mongo/UserManager.mongo.js";
import { validationExistUserRegister } from "../middleware/validationUserExistRegister.js";
import { validationLogin } from "../middleware/validationLogin.js";
import { getRoleUser } from "../middleware/getRoleUser.js";


const router = Router()


// Register
router.post("/register",validationExistUserRegister,async(req,res)=>{
    try {
        const newUser = await userManagerMongo.createUser(req.body)
        if(!newUser.status){
            throw ({error: true,status: 400, msj:"El usuario no se ha registrado. Debe ingresar todos los datos requeridos"} )
        }
        res.json(newUser)
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
})


// Login
router.post("/login",validationLogin,getRoleUser,async(req,res)=>{
    try {

        req.session.user = req.user

        res.json({msj: "Bienvenido, has ingreseado correctamente."})
    } catch (error) {
        res.json({error: error})

    }
})

router.post("/logout",(req,res)=>{
	req.session.destroy(error=>{
		if(error){
			res.json({error:"error logout", msg:"error al cerrar session"})
		}
		res.send("Session cerrada correctamente.")
    })
})


export default router