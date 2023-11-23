import CartManager from '../utils/CartManager.js';
import { validationNumPositive } from '../utils/validationNumPositive.js';

const cartManager = new CartManager()

export const validationExistenceCart = (req, res, netx) => {
    const { id } = req.params;
    const cart = cartManager.getCartById(validationNumPositive(id));

    if (!cart) {
        res.status(404).json({
            error: "Not found"
        });
    }

    netx();
};
