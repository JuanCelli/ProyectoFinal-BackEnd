import { Router } from "express";
import productModel from "../daos/models/product.model.js";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceProduct } from "../middleware/validationExistenceP.js";
import { productManagerMongo } from "../daos/managers/mongo/ProductManager.mongo.js"




const router = Router()


// Obtiene producto
router.get("/", async(req,res)=>{
    try {
        const {limit, page,query,sort} = req.query


        const products = await productManagerMongo.getProducts(limit, page, query, sort)
        res.json(products)
    } catch (error) {
        res.json(error)
    }
})


// Obtiene producto por id
router.get("/:id",async (req, res)=>{
    try {
        const {id} = req.params
        const product = await productManagerMongo.getProductById(id)

        if(!product){
            throw {status:404, msj: "Not found"}
        }

        res.json(product)
    } catch (error) {
        res.json(error)
    }
})

//Agrega un producto
router.post("/", async (req,res)=>{
    try {
        const product = await productManagerMongo.createProduct(req.body)

        if (!product.status){
            throw {status:400, msj: "No se pudo agregar el producto"}
        }
        res.json(product)
    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})




//Actualiza producto por id y por campo de body
router.put("/:id",validationId,valitionExistenceProduct,async (req,res)=>{
    try{
        const {id} = req.params

        const newProduct = req.body
        const response = await productManagerMongo.updateProduct(id, newProduct)

        if(response.error){
            throw response
        }

        res.json({message: `Producto actualizado con éxito (ID: ${id})`})

    }catch (error) {
        res.status(error.status).json({message:error.msj})
    }
})


//Elimina producto por id.
router.delete("/:id",validationId,valitionExistenceProduct,async (req,res)=>{
    try{
        const {id} = req.params

        const response = await productModel.updateOne({_id: id}, {status:false})

        if(response.error){
            throw response
        }

        res.json({message: `Producto eliminado con éxito (ID: ${id})`})
    }catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
})


export default router