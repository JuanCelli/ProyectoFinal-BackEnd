import { userManagerMongo } from "../daos/managers/mongo/UserManager.mongo.js"

export const validationExistUserRegister = async (req,res,next)=>{
    try {
        const {email} = req.body

        const user = await userManagerMongo.getUserByEmail(email)

        if(user.status===404){
            return next()
        }

        res.status(409).json({
            error: "El mail que intenta ingresar ya está registrado"
        })
    } catch (error) {
        res.json({
            error: error
        })
    }

}