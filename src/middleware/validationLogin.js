import { userManagerMongo } from "../daos/managers/mongo/UserManager.mongo.js"

export const validationLogin = async (req,res, next) =>{
    try {
        const {email,password} = req.body

        const user = await userManagerMongo.login(email,password)
        if(user.error){
            throw user
        }
        req.user = user
        next()
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
}