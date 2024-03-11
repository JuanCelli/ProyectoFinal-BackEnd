
import CustomError from "../services/errors/CustomError.js";
import errorsEnum from "../services/errors/errors.enum.js";
import { cartService } from "../services/service.js";



export  const  valitionExistenceCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const cart = await cartService.getCartById(id)

        if(cart.error){
            CustomError.createError({
                name:"Cart Get Error",
                cause:null,
                message:"Carrito no encontrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}