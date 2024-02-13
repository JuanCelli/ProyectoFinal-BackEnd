import { Router } from "express";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceProduct } from "../middleware/validationExistenceP.js";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct} from "../controllers/products.controller.js";


const router = Router()


// Obtiene producto
router.get("/",getProducts)


// Obtiene producto por id
router.get("/:id",getProductById)

//Agrega un producto
router.post("/",createProduct)


//Actualiza producto por id y por campo de body
router.put("/:id",validationId,valitionExistenceProduct,updateProduct)


//Elimina producto por id.
router.delete("/:id",validationId,valitionExistenceProduct,deleteProduct)


export default router