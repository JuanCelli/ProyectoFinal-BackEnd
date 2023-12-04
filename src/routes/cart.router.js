import { Router } from "express";
import { validationExistenceCart } from "../middleware/validationExistenceCart.js";
import CartManager from "../utils/CartManager.js";
import {generatorId} from '../utils/generatorId.js'
import { validationAddCart } from "../middleware/validationAddCart.js";
import { validationUpgradeCart } from "../middleware/validationUpgradeCart.js";

const router = Router()
export const cartManager = new CartManager()

// Obtiene carrito por id
router.get("/:id", validationExistenceCart,(req, res)=>{
    const {id} = req.params
    res.json(cartManager.getCartById(Number(id)).products)

})


//Crea un carrito
router.post("/",validationAddCart,(req,res)=>{
    const cart = {id: generatorId(cartManager.getAllCarts()),products:[],status:true}
    
    cartManager.addCart(cart)
    res.json(cart)

})


//Actualiza cantidad de producto por id de un carrito.
router.post("/:id/product/:pid",validationExistenceCart,validationUpgradeCart,(req,res)=>{

    const {id,pid} = req.params

    cartManager.updateCart(Number(id),Number(pid))


    res.json(cartManager.getCartById(Number(id)))

})


//Elimina producto por id.
router.delete("/:id",validationExistenceCart,(req,res)=>{
    const {id} = req.params
    const productDeleted = cartManager.getCartById(Number(id))
    cartManager.deleteCart(Number(id))
    res.json(productDeleted)
})


export default router