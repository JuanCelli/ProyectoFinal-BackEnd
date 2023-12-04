import { Router } from "express";
import ProductManager from "../utils/ProductManager.js";

const productManager = new ProductManager()

const router = Router();

router.get("/", (req,res)=>{
    res.render("home",{
        title:"Inicio",
        products:productManager.getProducts()
    })
})
router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts",{
        title:"Listado en tiempo real",
    })
})



export default router


