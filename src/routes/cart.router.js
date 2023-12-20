import { Router } from "express";
import CartManager from "../daos/managers/CartManager.fs.js";
import cartModel from "../daos/models/cart.model.js";
import productModel from "../daos/models/product.model.js";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceCart } from "../middleware/validationExistenceC.js";

const router = Router()
export const cartManager = new CartManager()

// Obtiene carrito por id
router.get("/:id",validationId,async (req, res)=>{
    try {
        const {id} = req.params
        const cart = await cartModel.findOne({$and:[{_id: id},{status:true}]})

        if(!cart){
            throw {status:404, msj: "Not found"}
        }

        res.json(cart)
    }catch (error){
        console.log(error)
        res.status(error.status).json({message:error.msj })
    }
})


//Crea un carrito
router.post("/",async (req,res)=>{
    try{
        const objectIdProducts = await productModel.distinct("_id")
        const idsProducts = objectIdProducts.map(id => id.toString())
        let notFound = false
        req.body.products.map((product)=>{
            if(!idsProducts.includes(product.id)){
                notFound = true
            }
        })
        if(notFound){
            throw {status:404, msj: "Not found"}
        }

        const cart = await cartModel.create(req.body)

        res.json(cart)

    }catch (error){
        console.log(error)
        res.status(error.status||500).json({message:error.msj || error})
    }
})

//Actualiza cantidad de producto por id de un carrito.
router.post("/:id/product/:pid",validationId,valitionExistenceCart,async (req,res)=>{

    try {
        const {id,pid} = req.params

        const response = await cartModel.updateOne({_id: id, "products.id":pid},{$inc:{"products.$.quality":1}})

        if(response.modifiedCount==0){
            throw {status:404, msj: "Product not found"}
        }

        const cartUpdated = await cartModel.findOne({$and:[{_id: id},{status:true}]})
        res.json(cartUpdated)

    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({message:error.msj || error})
    }
})


//Elimina carrito por id
router.delete("/:id",validationId,valitionExistenceCart,async (req,res)=>{
    try {
        const {id} = req.params

        const response = await cartModel.updateOne({_id: id}, {status:false})

        const deletedCart = await cartModel.findOne({_id: id})
        res.json(deletedCart)
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({message:error.msj})
    }
})


export default router