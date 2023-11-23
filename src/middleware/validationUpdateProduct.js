import ProductManager from "../utils/ProductManager.js"

export const validationUpdateProducts = (req,res,next) =>{

    try{
        const productManager = new ProductManager()
        const {id} = req.params
    
        const keysInput = Object.keys(req.body)
        const keysProduct = Object.keys(productManager.getProductById(Number(id)))

        keysInput.forEach(key=>{
            if(key==="id"){
                throw {status:500, msj: "No se puede modificar el id de un producto"}
            }
            if(!keysProduct.includes(key)){
                throw {status:404, msj: "Not found key"}
            }
        })

        next()

    }catch(error){
        res.status(error.status).json({ error: error.msj });
    }

}