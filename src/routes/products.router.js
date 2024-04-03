import { Router } from "express";
import { validationId } from "../middleware/validationId.js";
import { valitionExistenceProduct } from "../middleware/validationExistenceP.js";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct, getMockingProducts} from "../controllers/products.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { setRoleAdminTest } from "../middleware/setRoleAdminTest.js";


const router = Router()


// Obtiene producto
router.get("/",getProducts)

router.get("/mockingproducts",getMockingProducts)

// Obtiene producto por id
router.get("/:id",getProductById)

//Agrega un producto
router.post("/",passportCall("current",{},["admin","premium"]),createProduct)
// router.post("/",createProduct)





//Actualiza producto por id y por campo de body
router.put("/:id",passportCall("current",{},["admin","premium"]),validationId,valitionExistenceProduct,updateProduct)


//Elimina producto por id.
router.delete("/:id",passportCall("current",{},["admin","premium"]),validationId,setRoleAdminTest,valitionExistenceProduct,deleteProduct)



export default router