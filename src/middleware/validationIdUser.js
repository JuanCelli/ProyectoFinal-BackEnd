import { userService } from "../services/service.js"



export const validationIdUser = async (req, res,next) =>{
    try {
        const {id} = req.params
        const user =  await userService.getUserById(id)

        if(user.error){
            CustomError.createError({
                name:"Get User Error",
                message:"Usuario no econtrado.",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}