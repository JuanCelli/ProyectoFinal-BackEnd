import { cartManagerMongo } from "../daos/managers/mongo/CartManager.mongo.js"

export const getCartById = async (req, res) => {
    try {
        const {id} = req.params
        const response = await cartManagerMongo.getCartById(id)

        if(response.error){
            throw response
        }

        res.json(response)
    }catch (error){
        res.status(error.status).json({message:error.msj })
    }
}


export const createCart = async (req, res) => {
    try{
        const cart = await cartManagerMongo.createCart()
        res.json(cart)

    }catch (error){
        res.json(error)
    }
}

export const addProductById = async (req, res) => {

    try {
        const {id,pid} = req.params
        const response = await cartManagerMongo.addProductToCart(id, pid)

        if(response.error){
            throw response
        }
        res.json({message:"Producto agregado al carrito con éxito"})
    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
}

export const updateQuantityProductInCart = async (req, res) => {
    try {
        const {id,pid} = req.params
        const {newQuality} = req.body

        const response = await cartManagerMongo.updateQualityProductInCart(id,pid, newQuality)

        if(response.error){
            throw response
        }
        res.json({message:"Cantidad actuliaza con éxito."})

    }catch(error){
        res.status(error.status).json({message:error.msj})
    }
}

export const incrementQuantityProductInCart = async (req, res) => {

    try {
        const {id,pid} = req.params

        const response = await cartManagerMongo.incrementProductInCart(id, pid)

        if(response.error){
            throw response
        }

        res.json({message:`Producto del carrito actualizado correctamente`})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
}

export const updateCart = async (req, res) => {

    try {
        const {id} = req.params
        const response = await cartManagerMongo.updateCart(id, req.body)
        if(response.error){
            throw response
        }
        res.json({message:"Carrito actualizado con éxito"})
    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
}

export const deleteCartById = async (req, res) => {
    try {
        const {id} = req.params

        const response = await cartManagerMongo.deleteCart(id)

        if(response.error){
            throw response
        }

        res.json({message:"Carrito eliminado con éxito"})
    } catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
}
export const deleteProductFromCart = async (req, res) => {
    try {
        const {id,pid} = req.params

        const response = await cartManagerMongo.deleteProductFromCart(id, pid)

        if(response.error){
            throw response
        }

        res.json({message:"Producto eliminado del carrito con éxito"})
    } catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
}
export const deleteAllProductFromCart = async (req, res) => {
    try {
        const {id} = req.params
        const response = await cartManagerMongo.deleteAllProductFromCart(id)

        if(response.erro){
            throw response
        }
        res.json({message:"Productos eliminados del carrito con éxito"})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
    }
}



