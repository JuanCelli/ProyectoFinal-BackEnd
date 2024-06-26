import { Router } from "express";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceCart } from "../middleware/validationExistenceC.js";
import { getCartById,createCart,addProductById,updateQuantityProductInCart,incrementQuantityProductInCart,updateCart,deleteCartById,deleteProductFromCart,deleteAllProductFromCart,purchaseCart, getCartByOwner} from "../controllers/carts.controller.js";
import {passportCall} from "../passport/passportCall.js"


const router = Router()


// Obtiene carrito por id
router.get("/:id",validationId,getCartById)

// Obtiene carrito de el usuario con sesion en curso
router.get("/",passportCall("current"),getCartByOwner)


//Crea un carrito
router.post("/",passportCall("current"),createCart)

// Agrega un producto a un carrito por id, si ya existe en ese carrito le aumento 1 la quantity.
router.post("/:id/product/:pid",passportCall("current"),validationId,valitionExistenceCart,addProductById)

// Actualiza la quality de un product por su id.
router.put("/:id/product/:pid",validationId,valitionExistenceCart,updateQuantityProductInCart)

//Actualiza cantidad de producto por id de un carrito.
router.put("/:id/product/:pid/increment",validationId,valitionExistenceCart,incrementQuantityProductInCart)

// Actualiza el array products con req.body de un carrito por id.
router.put("/:id",validationId,valitionExistenceCart,updateCart)


//Elimina carrito por id
router.delete("/:id",validationId,valitionExistenceCart,deleteCartById)

// Elimina producto por id del carrito por su id.
router.delete("/:id/product/:pid",validationId,valitionExistenceCart,deleteProductFromCart)


// Elimina todos los productos de ese carrito.
router.delete("/:id/deleteProducts",validationId,valitionExistenceCart,deleteAllProductFromCart)

// Finaliza la compra del carrito, genera y guarda tkt.
router.post("/:id/purchase",validationId,valitionExistenceCart,purchaseCart)


export default router