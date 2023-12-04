import Product from "../Product.js"
import { productManager } from "../routes/products.router.js"


export  const testProductManager = async ()=>{
    console.log(productManager.getProducts())


    productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "159",25))
    console.log(productManager.getProducts())
    console.log(productManager.getProductById(1))

    productManager.updateProduct(1, new Product("Prueba de actualización", "Este es un producto prueba", 200, "Sin imagen", "abc123",25))
    console.log(productManager.getProducts())
}