import { productsService } from "../services/service.js";


export  const  valitionExistenceProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await productsService.getProductById(id)

        if(!product){
            throw {status:404, msj: "Not found"}
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(error.status).json({ message: error.msj})
    }
}