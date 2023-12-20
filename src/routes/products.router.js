import { Router } from "express";
import ProductManager from "../daos/managers/ProductManager.fs.js";
import productModel from "../daos/models/product.model.js";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceProduct } from "../middleware/validationExistenceP.js";


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
router.get("/:id",validationId,valitionExistenceProduct,async (req, res)=>{
    try {
        const product = await productModel.findOne({$and:[{_id: req.params.id},{status:true}]})

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
router.put("/:id",validationId,valitionExistenceProduct,async (req,res)=>{
    try{
        const {id} = req.params

        const newProduct = req.body
        const response = await productModel.updateOne({_id: id}, newProduct)

        if(response.modifiedCount==0){
            throw {status:400, msj: "Producto no actualizado"}
        }

        const updatedProduct = await productModel.findOne({_id: id})
        res.json(updatedProduct)

    }catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})


//Elimina producto por id.
router.delete("/:id",validationId,valitionExistenceProduct,async (req,res)=>{
    try{
        const {id} = req.params

        const response = await productModel.updateOne({_id: id}, {status:false})

        const deletedProduct = await productModel.findOne({_id: id})
        res.json(deletedProduct)
    }catch (error) {
        console.log(error)
        res.status(error.status||500).json({message:error.msj||error})
    }
})


export default router