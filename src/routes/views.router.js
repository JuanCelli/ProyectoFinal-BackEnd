import { Router } from "express";
import ProductManager from "../daos/managers/fileSystem/ProductManager.fs.js";
import { productManagerMongo } from "../daos/managers/mongo/ProductManager.mongo.js";
import {authSession} from "../middleware/authSession.js"

const productManager = new ProductManager()

const router = Router();



const productsView = async (req,res)=>{
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
}

router.get("/", authSession, productsView)


router.get("/products",authSession, productsView)



router.get("/chat", (req,res)=>{
    res.render("chat",{
        title:"Chat",
    })
})



export default router


