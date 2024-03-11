import { cartManager } from '../routes/cart.router.js';
import CustomError from '../services/errors/CustomError.js';
import errorsEnum from '../services/errors/errors.enum.js';
import { validationNumPositive } from '../utils/validationNumPositive.js';



export const validationExistenceCart = (req, res, netx) => {

    try {
        const { id } = req.params;
        const cart = cartManager.getCartById(validationNumPositive(id));
    
        if (!cart) {
            CustomError.createError({
                name:"Cart Get Error",
                cause:null,
                message:"Carrito no econtrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }
        netx();
    } catch (error) {
        netx(error)
    }
};
