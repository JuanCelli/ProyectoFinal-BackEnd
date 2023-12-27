import { Router } from "express";
import CartManager from "../daos/managers/CartManager.fs.js";
import cartModel from "../daos/models/cart.model.js";
import productModel from "../daos/models/product.model.js";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceCart } from "../middleware/validationExistenceC.js";
import { cartManagerMongo } from "../daos/managers/CartManager.mongo.js";

const router = Router()
export const cartManager = new CartManager()

// Obtiene carrito por id
router.get("/:id",validationId,async (req, res)=>{
    try {
        const {id} = req.params
        const response = await cartManagerMongo.getCartById(id)
        console.log(response)

        if(response.error){
            throw response
        }

        res.json(response)
    }catch (error){
        res.status(error.status).json({message:error.msj })
    }
})


//Crea un carrito
router.post("/",async (req,res)=>{
    try{
        const cart = await cartManagerMongo.createCart()
        res.json(cart)

    }catch (error){
        res.json(error)
    }
})

router.put("/:id/product/:pid",validationId,valitionExistenceCart,async (req,res)=>{

    try {
        const {id,pid} = req.params
        const response = await cartManagerMongo.addProductToCart(id, pid)

        if(response.error){
            throw response
        }
        res.json({message:"Producto agregado al carrito con éxito"})
    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})

//Actualiza cantidad de producto por id de un carrito.
router.put("/:id/product/:pid/increment",validationId,valitionExistenceCart,async (req,res)=>{

    try {
        const {id,pid} = req.params

        const response = await cartManagerMongo.incrementProductInCart(id, pid)

        if(response.error){
            throw response
        }

        res.json({message:`Producto del carrito actualizado correctamente`})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})


//Elimina carrito por id
router.delete("/:id",validationId,valitionExistenceCart,async (req,res)=>{
    try {
        const {id} = req.params

        const response = await cartManagerMongo.deleteCart(id)

        if(response.error){
            throw response
        }

        res.json({message:"Carrito eliminado con éxito"})
    } catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})

router.delete("/:id/product/:pid",validationId,valitionExistenceCart,async (req,res)=>{
    try {
        const {id,pid} = req.params

        const response = await cartManagerMongo.deleteProductFromCart(id, pid)

        if(response.error){
            throw response
        }

        res.json({message:"Producto eliminado del carrito con éxito"})
    } catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})

router.put("/:id",validationId,valitionExistenceCart,async (req,res)=>{

    try {
        const {id} = req.params
        const response = await cartManagerMongo.updateCart(id, req.body)
        if(response.error){
            throw response
        }
        res.json({message:"Carrito actualizado con éxito"})
    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})

router.put("/:id/product/:pid/quality",validationId,valitionExistenceCart,async (req,res)=>{
    try {
        const {id,pid} = req.params
        const newQuality = Number(req.body.newQuality)

        if(typeof(newQuality)!=="number"){
            throw {status:400, msj: "La nueva cantidad debe ser un número"}
        }

        const response = await cartManagerMongo.updateQualityProductInCart(id, pid, newQuality)

        if(response.error){
            throw response
        }

        res.json({message:`Producto del carrito actualizado correctamente`})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})

router.delete("/:id/deleteProducts",validationId,valitionExistenceCart,async (req,res)=>{
    try {
        const {id} = req.params
        const response = await cartManagerMongo.deleteAllProductFromCart(id)

        if(response.erro){
            throw response
        }
        res.json({message:"Productos eliminados del carrito con éxito"})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})


export default router