import { Router } from "express";
import ProductManager from "../daos/managers/ProductManager.fs.js";

const productManager = new ProductManager()

const router = Router();

router.get("/", (req,res)=>{
    res.render("home",{
        title:"Inicio",
        products:productManager.getProducts()
    })
})
router.get("/chat", (req,res)=>{
    res.render("chat",{
        title:"Chat",
    })
})



export default router


