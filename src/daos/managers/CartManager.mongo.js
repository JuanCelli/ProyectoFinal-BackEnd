import cartModel from "../models/cart.model.js"

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

    createCart(){
        try {
            const newCart = cartModel.create({productsCart:[]})
            return newCart
        } catch (error) {
            return error
        }
    }

    async addProductToCart(id, pid){
        try {
            const product = await cartModel.findOne({$and:[{_id: id},{productsCart:{id:pid}}]})

            if(product){
                throw {error: true, status:400, msj: "El producto ya existe en el carrito"}
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
            const response = await cartModel.updateOne({_id: id, "productsCart.id":pid},{$inc:{"productsCart.$.quality":1}})

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
            const response = await cartModel.updateOne({_id: id, "productsCart.id":pid},{$set:{"productsCart.$.quality":newQuality}})


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
            const response = await cartModel.updateOne({_id: id}, {$pull: {productsCart:{id:pid}}})
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


}






export const cartManagerMongo = new CartManagerMongo()