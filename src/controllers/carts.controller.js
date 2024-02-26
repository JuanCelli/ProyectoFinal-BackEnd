import { cartService, productsService, ticketService } from "../services/service.js"

export const getCartById = async (req, res) => {
    try {
        const {id} = req.params
        const response = await cartService.getCartById(id)

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
        const cart = await cartService.createCart()
        res.json(cart)

    }catch (error){
        res.json(error)
    }
}

export const addProductById = async (req, res) => {

    try {
        const {id,pid} = req.params
        const response = await cartService.addProductToCart(id, pid)

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

        const response = await cartService.updateQualityProductInCart(id,pid, newQuality)

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

        const response = await cartService.incrementProductInCart(id, pid)

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
        const response = await cartService.updateCart(id, req.body)
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

        const response = await cartService.deleteCart(id)

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

        const response = await cartService.deleteProductFromCart(id, pid)

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
        const response = await cartService.deleteAllProductFromCart(id)

        if(response.error){
            throw response
        }
        res.json({message:"Productos eliminados del carrito con éxito"})

    } catch (error) {
        res.status(error.status).json({message:error.msj})
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

        res.json({message:"Compra realizada con éxito", amount: amount, notStockProducts: notStockProducts,ticket: ticketResponse})

    } catch (error) {
        console.log(error)
        res.json({message:error.msj})
    }
}


