import { cartManager } from '../routes/cart.router.js';
import { validationNumPositive } from '../utils/validationNumPositive.js';


export const validationExistenceCart = (req, res, netx) => {
    const { id } = req.params;
    const cart = cartManager.getCartById(validationNumPositive(id));

    if (!cart) {
        return res.status(404).json({
            error: "Not found"
        });
    }

    netx();
};
