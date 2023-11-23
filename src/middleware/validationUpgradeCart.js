import ProductManager from "../utils/ProductManager.js"

export const validationUpgradeCart = (req,res,next) =>{
        const productManager = new ProductManager()
        const {pid} = req.params
        
        if(!productManager.getProductById(Number(pid))){
            return res.status(404).json({
                error:`El producto que intenta ingresar no existe`
            })
        }

        next()
}