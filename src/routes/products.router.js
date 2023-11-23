import { Router } from "express";
import ProductManager from "../utils/ProductManager.js";
import {validationNumPositive} from '../utils/validationNumPositive.js'
import { validationExistenceProduct } from "../middleware/validationExistenceProduct.js";
import { validationAddProduct } from "../middleware/validationAddProduct.js";
import { validationUpdateProducts } from "../middleware/validationUpdateProduct.js";
import { generatorId } from "../utils/generatorId.js";


const router = Router()
export const productManager = new ProductManager()


// Obtiene producto
router.get("/",(req,res)=>{
    const {limit} = req.query

    if(limit){
        res.json({products:productManager.getProducts().slice(0,validationNumPositive(limit))})
    }else{
        res.json({products:productManager.getProducts()})
    }
})



// Obtiene producto por id
router.get("/:id",validationExistenceProduct,(req, res)=>{
    const {id} = req.params

    res.json(
        productManager.getProductById(validationNumPositive(id))
    )
})

//Agrega un producto
router.post("/",validationAddProduct,(req,res)=>{
    const product = {id:generatorId(productManager.getProducts()),...req.body}
    productManager.addProduct(product)
    res.json(
        product
    )
})



//Actualiza producto por id y por campo de body
router.put("/:id",validationExistenceProduct,validationUpdateProducts,(req,res)=>{
    const {id} = req.params
    productManager.updateProduct(Number(id), req.body)
    res.json(productManager.getProductById(Number(id)))
})


//Elimina producto por id.
router.delete("/:id",validationExistenceProduct,(req,res)=>{
    const {id} = req.params
    const productDeleted = productManager.getProductById(Number(id))
    productManager.deleteProduct(Number(id))

    res.json(
        productDeleted
    )
})


export default router