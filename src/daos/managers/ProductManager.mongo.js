import { formatPaginationResult } from "../../utils/formatPaginationResult.js"
import { setPaginationOptions } from "../../utils/setPaginationOptions.js"
import productModel from "../models/product.model.js"



class ProductManagerMongo{
    async getProducts (limit, page, query, sort){
        try {
            const paginationOptions = setPaginationOptions(limit, page, sort)
            const categoryfilter = query ? {$and:[{category:query},{status:true}]} : {status:true}


            const products = await productModel.paginate({...categoryfilter},{...paginationOptions})
            return formatPaginationResult(products)

        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            return await productModel.findOne({$and:[{_id: id},{status:true}]})
        } catch (error) {
            return error
        }
    }

    async createProduct(product){
        try {
            const newProduct = await productModel.create(product)
            console.log(newProduct)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, newProduct){
        try {
            const response = await productModel.updateOne({_id: id}, newProduct)
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Producto no actualizado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const response = await productModel.updateOne({_id: id}, {status:false})
            console.log(response)
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Producto no eliminado"}
            }
            return response
        } catch (error) {
            return error
        }
    }

}



export const productManagerMongo = new ProductManagerMongo()