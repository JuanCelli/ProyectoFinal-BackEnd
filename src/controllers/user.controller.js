import CustomError from "../services/errors/CustomError.js";
import errorsEnum from "../services/errors/errors.enum.js";
import { resetTokenService, userService } from "../services/service.js";
import createHash from "../utils/createHash.js";
import isValidPassword from "../utils/isValidPassword.js";
import { sendEmail } from "../utils/sendMail.js";


export const changePasswordUser = async (req, res,next) => {
    try {
        const {idToken} = req.params
        const {newPassword} = req.body

        const token = await resetTokenService.getResetTokenById(idToken)


        if(!token){
            CustomError.createError({
                name:"Valid Token Error",
                cause:null,
                message:"El link para reestablecimiento de contraseña no fue encontrado o ha expirado.",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        if(isValidPassword(token.user,newPassword)){
            CustomError.createError({
                name:"Valid Password Error",
                cause:null,
                message:"La contraseña que está intentado colocar es igual a la anterior, pruebe con otra contraseña.",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }


        const response = await userService.changeUserPassword(token.user._id, createHash(newPassword))

        if(response.error){
            CustomError.createError({
                name:"Update User Password Error",
                message:response.msj,
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({message: "Cambio de contraseña realizado con éxito."})
    } catch (error) {
        next(error)
    }
}

export const sendEmailWithLinkToResetPassword = async (req,res,next) => {
    try {
        const {email} = req.body

        const user = await userService.getUserByEmail(email)
        
        if(user.error){
            CustomError.createError({
                name:"Get User Error",
                message:"Usuario no econtrado.",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }
        const {_id} = user
        const id = _id.toString()

        
        const token = await generateTokenToResetPassword(id)
        
        if(!token||token.errors){
            CustomError.createError({
                name:"Create Token Error",
                message:"Error al intentar crear token para reestablecimiento de contraseña.",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        sendEmail(token._id,email)
        res.json({message: "Email para reestablecer contraseña enviado."})
    } catch (error) {
        next(error)
    }
}

export const generateTokenToResetPassword = async (id) => {
    try {
        const token = await resetTokenService.createResetToken(id)
        return token
    } catch (error) {
        console.log(error)
    }
}


export const switchRoleUser = async (req,res,next) =>{
    try {
        const {id} = req.params

        const user = await userService.getUserById(id)

        if(user.error){
            CustomError.createError({
                name:"Get User Error",
                message:"Usuario no encontrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        
        if(user.role==="admin"){
            CustomError.createError({
                name:"Switch Role User Error",
                message:"El usuario es administrado, no puede cambiar de su rol.",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        
        let newRole
        if(user.role==="user"){
            const typesDocs = ["identification", "proofAddress", "proofAccount"]
            const validationDoc = typesDocs.every(type=>user.documents.find(doc=>doc.type===type))
            if(!validationDoc){
                CustomError.createError({
                    name:"Switch Role User Error",
                    message:"El usuario no ha terminado de cargar su documentación.",
                    code: errorsEnum.PRE_CONDITION_ERROR,
                })
            }
            newRole = "premium"
        }
        else{
            newRole = "user"
        }

        const response = await userService.changeUserRole(id,newRole)

        if(response.error){
            CustomError.createError({
                name:"Update User Role Error",
                message:response.msj,
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }

        res.json({message: "Cambio de rol realizado con éxito."})
    } catch (error) {
        next(error)
    }
}