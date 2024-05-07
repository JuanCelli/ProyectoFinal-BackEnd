import { productsService } from "../../service.js"
import cartModel from "./models/cart.model.js"


class CartManagerMongo{
    async getCartById(id){
        try {
            const cart = await cartModel.findOne({$and:[{_id: id},{status:true}]}).populate("productsCart.product")

            if(!cart){
                throw {error: true, status:404, msj: "Not found"}
            }

            return cart

        } catch (error) {
            return error
        }
    }

    async createCart(owner){
        try {
            const newCart = await cartModel.create({productsCart:[],owner:owner})
            return newCart
        } catch (error) {
            return error
        }
    }

    async addProductToCart(id, pid){
        try {
            const product = await productsService.getProductById(pid)

            if(!product){
                throw {error: true,status:404, msj: "Producto no encontrado"}
            }

            const productInCart = await cartModel.findOne({$and:[{_id: id},{"productsCart.product":pid}]})

            if(productInCart){
                return response = await this.incrementProductInCart(id, pid)
            }

            const response = await cartModel.updateOne({_id: id}, {$push: {productsCart:{product:pid}}})

            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }


    async updateCart(id, products){
        try {
            const response = await cartModel.updateOne({_id: id}, {productsCart: products})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async incrementProductInCart(id, pid){
        try {
            const response = await cartModel.updateOne({_id: id, "productsCart.product":pid},{$inc:{"productsCart.$.quality":1}})

            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async updateQualityProductInCart(id, pid,newQuality){
        const newQualityNumber = parseInt(newQuality)

        try {
            if(newQualityNumber<0 || isNaN(newQualityNumber)){
                throw {error: true,status:400, msj:"El valor ingresado no es valido."}
            }
            const response = await cartModel.updateOne({_id: id, "productsCart.product":pid},{$set:{"productsCart.$.quality":newQualityNumber}})

            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async deleteCart(id){
        try {
            const response = await cartModel.updateOne({_id: id}, {status:false})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no eliminado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async deleteProductFromCart(id, pid){
        try {
            const response = await cartModel.updateOne({_id: id}, {$pull: {productsCart: {product:pid}}})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Producto no eliminado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async deleteAllProductFromCart(id){
        try {
            const response = await cartModel.updateOne({_id: id}, {$set: {productsCart:[]}})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Productos no eliminados"}
            }
            return response

        } catch (error) {
            return error
        }
    }

    async getCartByOwner(email){
        try {
            const cart = await cartModel.findOne({$and:[{owner: email},{status:true}]}).populate("productsCart.product")

            if(!cart){
                throw {error: true, status:404, msj: "Not found"}
            }

            return cart

        } catch (error) {
            return error
        }
    }


}

export const cartManagerMongo = new CartManagerMongo()