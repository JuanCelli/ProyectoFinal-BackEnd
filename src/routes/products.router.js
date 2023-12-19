import { Router } from "express";
import ProductManager from "../daos/managers/ProductManager.fs.js";
import { generatorId } from "../utils/generatorId.js";
import { updateProductsToClient } from "../server.js";
import productModel from "../daos/models/product.model.js";


const router = Router()
export const productManager = new ProductManager()


// Obtiene producto
router.get("/", async(req,res)=>{
    try {
        const products = await productModel.find({status:true})
        res.json(products)
    } catch (error) {
        console.log(error)

        res.json({message:"error"})
    }
})



// Obtiene producto por id
router.get("/:id",async (req, res)=>{
    try {
        const product = await productModel.findOne({$and:[{_id: req.params.id},{status:true}]})
        if(!product){
            throw {status:404, msj: "Not found"}
        }
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})

//Agrega un producto
router.post("/", async (req,res)=>{
    try {
        const product = await productModel.create(req.body)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.json({message:error.message})
    }
})




//Actualiza producto por id y por campo de body
router.put("/:id",async (req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findOne({$and:[{_id: req.params.id},{status:true}]})

        if(!product){
            throw {status:404, msj: "Not found"}
        }

        const newProduct = req.body
        const response = await productModel.updateOne({_id: id}, newProduct)

        if(!response.acknowledged){
            throw {status:400, msj: "Producto no actualizado"}
        }
        res.json({response})

    }catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})


//Elimina producto por id.
router.delete("/:id",async (req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findOne({$and:[{_id: req.params.id},{status:true}]})

        if(!product){
            throw {status:404, msj: "Not found"}
        }

        const response = await productModel.updateOne({_id: id}, {status:false})
        res.json(response)
    }catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})


export default router