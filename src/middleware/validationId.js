import mongoose from "mongoose";
import CustomError from "../services/errors/CustomError.js";
import errorsEnum from "../services/errors/errors.enum.js";


export const validationId = (req, res, next) => {
    try {
        const { id,pid } = req.params
        if(id){
            if (!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.createError({
                    name:"Invalid Id Error",
                    cause:null,
                    message:"El ID ingresado no es valido",
                    code: errorsEnum.INVALID_TYPES_ERROR,
                })
            }
        }
        if(pid){
            if (!mongoose.Types.ObjectId.isValid(pid)) {
                CustomError.createError({
                    name:"Invalid Id Error",
                    cause:null,
                    message:"El ID ingresado no es valido",
                    code: errorsEnum.INVALID_TYPES_ERROR,
                })
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}