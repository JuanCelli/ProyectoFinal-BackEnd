import { Router } from "express";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceCart } from "../middleware/validationExistenceC.js";
import { cartManagerMongo } from "../daos/managers/mongo/CartManager.mongo.js";

const router = Router()

// Obtiene carrito por id
router.get("/:id",validationId,async (req, res)=>{
    try {
        const {id} = req.params
        const response = await cartManagerMongo.getCartById(id)

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

// Agrega un producto a un carrito por id, si ya existe en ese carrito le aumento 1 la quantity.
router.post("/:id/product/:pid",validationId,valitionExistenceCart,async (req,res)=>{

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

// Actualiza la quality de un product por su id.
router.put("/:id/product/:pid",validationId,valitionExistenceCart,async(req,res)=>{
    try {
        const {id,pid} = req.params
        const {newQuality} = req.body

        const response = await cartManagerMongo.updateQualityProductInCart(id,pid, newQuality)

        if(response.error){
            throw response
        }
        res.json({message:"Cantidad actuliaza con éxito."})

    }catch(error){
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

// Actualiza el array products con req.body de un carrito por id.
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

// Elimina producto por id del carrito por su id.
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


// Elimina todos los productos de ese carrito.
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