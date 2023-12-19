import { Router } from "express";
import { validationExistenceCart } from "../middleware/validationExistenceCart.js";
import CartManager from "../daos/managers/CartManager.fs.js";
import {generatorId} from '../utils/generatorId.js'
import { validationAddCart } from "../middleware/validationAddCart.js";
import { validationUpgradeCart } from "../middleware/validationUpgradeCart.js";
import cartModel from "../daos/models/cart.model.js";
import productModel from "../daos/models/product.model.js";

const router = Router()
export const cartManager = new CartManager()

// Obtiene carrito por id
router.get("/:id",async (req, res)=>{
    try {
        const {id} = req.params
        const cart = cartModel.findOne({$and:[{_id: id},{status:true}]})

        if(!cart){
            throw {status:404, msj: "Not found"}
        }

        res.json(cart)
    }catch (error){
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})


//Crea un carrito
router.post("/",async (req,res)=>{
    try{
        const idsProdcuts = await productModel.distinct("_id")
        req.body.products.map((product)=>{
            if(!idsProdcuts.includes(product.id)){
                throw {status:404, msj: "Not found"}
            }
        })
        const cart = await cartModel.create(req.body)
        res.json(cart)

    }catch (error){
        console.log(error)
        res.json({message:error.message})
    }
})


//Actualiza cantidad de producto por id de un carrito.
router.post("/:id/product/:pid",async (req,res)=>{

    const {id,pid} = req.params

    const cart = cartModel.findOne({$and:[{_id: id},{status:true}]})

    if(!cart){
        throw {status:404, msj: "Not found"}
    }

    const response = await cartModel.updateOne({_id:id},{
        products: {
            
        }
    })



})


//Elimina producto por id.
router.delete("/:id",validationExistenceCart,(req,res)=>{
    const {id} = req.params
    const productDeleted = cartManager.getCartById(Number(id))
    cartManager.deleteCart(Number(id))
    res.json(productDeleted)
})


export default router