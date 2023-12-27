import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"


class CartManagerMongo{
    async getCartById(id){
        try {
            const cart = await cartModel.findOne({$and:[{_id: id},{status:true}]}).populate("products.id")

            if(!cart){
                throw {error: true, status:404, msj: "Not found"}
            }

            return cart

        } catch (error) {
            return error
        }
    }

    createCart(){
        try {
            const newCart = cartModel.create({products:[]})
            console.log(newCart)
            return newCart
        } catch (error) {
            return error
        }
    }

    async addProductToCart(id, pid){
        try {
            console.log(pid)
            const product = await cartModel.findOne({$and:[{_id: id},{products:{id:pid}}]})

            console.log(product)
            if(product){
                throw {error: true, status:400, msj: "El producto ya existe en el carrito"}
            }

            const response = await cartModel.updateOne({_id: id}, {$push: {products:{id:pid}}})

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
            const response = await cartModel.updateOne({_id: id}, {products: products})
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
            const response = await cartModel.updateOne({_id: id, "products.id":pid},{$inc:{"products.$.quality":1}})

            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Carrito no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async updateQualityProductInCart(id, pid,newQuality){

        try {
            console.log(newQuality)
            const response = await cartModel.updateOne({_id: id, "products.id":pid},{$set:{"products.$.quality":newQuality}})

            console.log(response)

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
            const response = await cartModel.updateOne({_id: id}, {$pull: {products:{id:pid}}})
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
            const response = await cartModel.updateOne({_id: id}, {$set: {products:[]}})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Productos no eliminados"}
            }
            return response

        } catch (error) {
            return error
        }
    }


}






export const cartManagerMongo = new CartManagerMongo()