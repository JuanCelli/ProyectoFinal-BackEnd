import Cart from "../models/Cart.js"
import ProductManager from "../utils/ProductManager.js"

export const validationAddCart = (req,res,netx) =>{
    try {
        const {products} = req.body
        const productManager = new ProductManager()
    
        if(!Array.isArray(products)){
            throw {status:500, msj: `Los datos ingresados de productos no tiene el formato requerido`}
        }
        
        const productsNormalized = products.map((product) => {
            if(!productManager.getProductById(product.id)){
                throw {status:404, msj: `Uno de los productos agregados no existe`}
            }
            if(typeof(product.quality)!=="number" || product.quality < 1){
                throw {status:404, msj: `Uno de los productos ingresado se intentó añadir con un tipo de datos distinto al requerido o menor a 1`}
            }
            return {id: product.id,quality: product.quality}
        });
    
        const cart = new Cart(productsNormalized)

        req.body = cart
        netx()
        
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
} 