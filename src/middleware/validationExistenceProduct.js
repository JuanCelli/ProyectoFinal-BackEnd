import { validationNumPositive } from '../utils/validationNumPositive.js';
import { productManager } from "../routes/products.router.js";

export const validationExistenceProduct = (req, res, netx) => {
    const { id } = req.params;
    const product = productManager.getProductById(validationNumPositive(id));

    if (!product) {
        res.status(404).json({
            error: "Not found"
        });
    }

    netx();
};
