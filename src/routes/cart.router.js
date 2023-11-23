import { Router } from "express";
import { validationExistenceCart } from "../middleware/validationExistenceCart.js";
import CartManager from "../utils/CartManager.js";
import {generatorId} from '../utils/generatorId.js'
import { validationAddCart } from "../middleware/validationAddCart.js";

const router = Router()
const cartManager = new CartManager()

// Obtiene carrrito por id
router.get("/:id", validationExistenceCart,(req, res)=>{
    const {id} = req.params
    res.json(
        cartManager.getCartById(Number(id))
    )

})


//Crea un carrito
router.post("/",validationAddCart,(req,res)=>{
    const cart = {id: generatorId(cartManager.getCarts()),...req.body}
    
    cartManager.addCart(cart)
    res.json(
        cart
    )
    // Solo con id de carrito y array de prodcutos que contiene.
    

})


//Crea un carrito
router.post("/",(req,res)=>{
    // Solo con id de carrito y array de prodcutos que contiene.

})


//Actualiza cantidad de producto por id de un carrito.
router.put("/:cid/product/:pid",(req,res)=>{
    const {cid,pid} = req.params

})


//Elimina producto por id.
router.delete("/:id",(req,res)=>{

})


export default router