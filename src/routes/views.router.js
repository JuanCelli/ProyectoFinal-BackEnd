import { Router } from "express";
import ProductManager from "../daos/managers/fileSystem/ProductManager.fs.js";
import { productManagerMongo } from "../daos/managers/mongo/ProductManager.mongo.js";
import {authSession} from "../middleware/authSession.js"

const productManager = new ProductManager()

const router = Router();

router.get("/", (req,res)=>{
    res.render("home",{
        title:"Inicio",
        products:productManager.getProducts()
    })
})


router.get("/products",authSession, async (req,res)=>{
    try {
        const {limit, page, query, sort} = req.query
        const productsInDb = await productManagerMongo.getProducts(limit,page,query,sort)
        const products = productsInDb.payload.map((product)=>(
            {
                title: product.title,
                price: product.price,
                stock: product.stock,
            }
        ))
        const user = req.session.user
        res.render("products",{
            title:"Productos",
            products: products,
            user,
            role:req.session.role
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


