import Cart from "../models/Cart.js"
import CartManager from "../utils/CartManager.js"

export const validationAddCart = (req,res,netx) =>{
    const {products} = req.body
    const cart = new Cart(products)
    const cartManager = new CartManager()

    req.body = cart
    netx()
} 