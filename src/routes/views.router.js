import { Router } from "express";
import ProductManager from "../daos/managers/ProductManager.fs.js";
import { productManagerMongo } from "../daos/managers/productManager.mongo.js";

const productManager = new ProductManager()

const router = Router();

router.get("/", (req,res)=>{
    res.render("home",{
        title:"Inicio",
        products:productManager.getProducts()
    })
})



router.get("/products", async (req,res)=>{
    try {
        const products = await productManagerMongo.getProducts(1,1)
        res.render("products",{
            title:"Productos",
            products: products.payload
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/chat", (req,res)=>{
    res.render("chat",{
        title:"Chat",
    })
})



export default router


