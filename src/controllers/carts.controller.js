import CustomError from "../services/errors/CustomError.js"
import errorsEnum from "../services/errors/errors.enum.js"
import { cartService, productsService, ticketService } from "../services/service.js"

export const getCartById = async (req, res,next) => {
    try {
        const {id} = req.params
        const response = await cartService.getCartById(id)

        if(response.error){
            CustomError.createError({
                name:"Cart Get Error",
                cause:null,
                message:"Carrito no econtrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        res.json(response)
    }catch (error){
        next(error)
    }
}


export const createCart = async (req, res) => {
    try{
        const cart = await cartService.createCart()
        res.res(201).json(cart)

    }catch (error){
        res.json(error)
    }
}

export const addProductById = async (req, res, next) => {

    try {
        const {id,pid} = req.params
        const response = await cartService.addProductToCart(id, pid)

        if(response.error){
            CustomError.createError({
                name:"Add Product to Cart Error",
                cause:null,
                message:"El producto que intenta agregar no fue econtrado",
                code: errorsEnum.notStockProducts,
            })
        }
        res.json({message:"Producto agregado al carrito con éxito"})
    } catch (error) {
        next(error)
    }
}

export const updateQuantityProductInCart = async (req, res,next) => {
    try {
        const {id,pid} = req.params
        const {newQuality} = req.body

        const response = await cartService.updateQualityProductInCart(id,pid, newQuality)

        if(response.error){
            CustomError.createError({
                name:"Cart Update Error",
                cause:null,
                message:"Error al intentar actualizar cantidad de productos en carrito",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({message:"Cantidad actuliaza con éxito."})

    }catch(error){
        next(error)
    }
}

export const incrementQuantityProductInCart = async (req, res,next) => {

    try {
        const {id,pid} = req.params

        const response = await cartService.incrementProductInCart(id, pid)

        if(response.error){
            CustomError.createError({
                name:"Cart Update Error",
                cause:null,
                message:"Error al intentar incrementar producto en carrito",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }

        res.json({message:`Producto del carrito actualizado correctamente`})

    } catch (error) {
        next(error)
    }
}

export const updateCart = async (req, res,next) => {

    try {
        const {id} = req.params
        const response = await cartService.updateCart(id, req.body)
        if(response.error){
            CustomError.createError({
                name:"Cart Update Error",
                cause:null,
                message:"Error al intentar incrementar actualizar carrito",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({message:"Carrito actualizado con éxito"})
    } catch (error) {
        next(error)
    }
}

export const deleteCartById = async (req, res,next) => {
    try {
        const {id} = req.params

        const response = await cartService.deleteCart(id)

        if(response.error){
            CustomError.createError({
                name:"Cart Delete Error",
                cause:null,
                message:"Error al intentar eliminar carrito",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }

        res.json({message:"Carrito eliminado con éxito"})
    } catch (error) {
        next(error)
    }
}
export const deleteProductFromCart = async (req, res,next) => {
    try {
        const {id,pid} = req.params

        const response = await cartService.deleteProductFromCart(id, pid)

        if(response.error){
            CustomError.createError({
                name:"Product Delete From Cart Error",
                cause:null,
                message:"Error al intentar eliminar producto del carrito",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        res.json({message:"Producto eliminado del carrito con éxito"})
    } catch (error) {
        next(error)
    }
}
export const deleteAllProductFromCart = async (req, res,next) => {
    try {
        const {id} = req.params
        const response = await cartService.deleteAllProductFromCart(id)

        if(response.error){
            CustomError.createError({
                name:"Products Delete From Cart Error",
                cause:null,
                message:"Error al intentar eliminar productos del carrito",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({message:"Productos eliminados del carrito con éxito"})

    } catch (error) {
        next(error)
    }
}

export const purchaseCart = async (req, res) => {
    try {
        const {id} = req.params
        const cart = await cartService.getCartById(id)

        if(cart.error){
            throw cart
        }

        const products = cart.productsCart

        if(products.length===0){
            throw {error:true, status:400, msj: "No se ha podido finalizar compra. El carrito está vacio"}
        }

        let amount = 0
        let notStockProducts = []

        products.map((product)=>{
            console.log(product)
            if(product.quality>=product.product.stock){
                notStockProducts.push(product)
                return
            }

            let objetcProduct = {...product.product}
            let updatedProductStock = {...objetcProduct._doc}
            updatedProductStock.stock = (product.product.stock-product.quality)


            const responseUpdateProduct = productsService.updateProduct(product.product._id,updatedProductStock)

            if(responseUpdateProduct.error){
                throw responseUpdateProduct
            }
            amount += product.product.price*product.quality
        })

        if(notStockProducts.length===products.length){
            throw {msj: "La compra no se ha podido finalizar con éxito debito a falta de stock en todos los productos seleccionados."}
        }

        const responseUpdateCart = cartService.updateCart(id, notStockProducts)

        if(responseUpdateCart.error){
            throw responseUpdateCart
        }

        const dataTicket = {
            amount: amount,
            purchaser :"HaImplementar@gmail.com"
        }

        const ticketResponse = await ticketService.createTicket(dataTicket)
        if(ticketResponse.error){
            throw ticketResponse
        }

        res.json({amount: amount, notStockProducts: notStockProducts,ticket: ticketResponse})

    } catch (error) {
        console.log(error)
        res.json({message:error.msj})
    }
}


