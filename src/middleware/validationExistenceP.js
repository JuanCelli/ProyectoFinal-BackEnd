import CustomError from "../services/errors/CustomError.js";
import errorsEnum from "../services/errors/errors.enum.js";
import { productsService } from "../services/service.js";



export  const  valitionExistenceProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await productsService.getProductById(id)

        if(!product){
            CustomError.createError({
                name:"Product Get Error",
                cause:null,
                message:"Producto no encontrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}