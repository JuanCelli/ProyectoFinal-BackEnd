import Product from "../models/Product.js"
import ProductManager from "../utils/ProductManager.js"
import { validationProduct } from "../utils/validationProduct.js"

export const validationAddProduct = (req,res,netx) =>{
    const {title,description,price,thumbnail,code,stock,status,category} = req.body
    const product = new Product(title,description,price,thumbnail,code,stock,status,category)
    const productManager = new ProductManager()
    const products = productManager.getProducts()

    if(!validationProduct(product)){
        return res.status(500).json({
            error: `No se han completado todos los campos o algún campo no cumple con el tipo de dato requerido`
        })
    }

    if(products.find(productJustAdded => productJustAdded.code === product.code)){
        return res.status(500).json({
            error:`El producto que intenta agregar ya ha sigo ingresado (Code: ${product.code})`
        })
    }

    req.body = product
    netx()
} 