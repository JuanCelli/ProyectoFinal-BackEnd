import { Router } from "express";
import { passportCall } from "../passport/passportCall.js";
import { productsService } from "../services/service.js";


const router = Router();


const productsView = async (req,res)=>{
    try {
        const {limit, page, query, sort} = req.query
        const productsInDb = await productsService.getProducts(limit,page,query,sort)
        const products = productsInDb.payload.map((product)=>(
            {
                title: product.title,
                price: product.price,
                stock: product.stock,
            }
        ))
        const user = req.user
        res.render("products",{
            title:"Productos",
            products: products,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

router.get("/", passportCall("current",{failureRedirect: '/users/login'}), productsView)


router.get("/products",passportCall("current",{failureRedirect: '/users/login'}), productsView)



router.get("/chat", (req,res)=>{
    res.render("chat",{
        title:"Chat",
    })
})



export default router


