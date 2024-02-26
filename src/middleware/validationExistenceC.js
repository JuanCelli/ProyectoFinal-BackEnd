
import { cartService } from "../services/service.js";


export  const  valitionExistenceCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const cart = await cartService.getCartById(id)

        if(cart.error){
            throw {status:404, msj: "Not found"}
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(error.status).json({ message: error.msj})
    }
}