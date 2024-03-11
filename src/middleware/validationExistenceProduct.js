import { validationNumPositive } from '../utils/validationNumPositive.js';
import { productManager } from "../routes/products.router.js";
import { productsService } from '../services/service.js';
import CustomError from '../services/errors/CustomError.js';
import errorsEnum from '../services/errors/errors.enum.js';

export const validationExistenceProduct = (req, res, netx) => {
    try {
        const { id } = req.params;
        
        const product = productsService.getProductById(validationNumPositive(id));
    
        if (!product) {
            CustomError.createError({
                name:"Product Get Error",
                cause:null,
                message:"Producto no econtrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }
        netx();
    } catch (error) {
        netx(error);
    }
};
