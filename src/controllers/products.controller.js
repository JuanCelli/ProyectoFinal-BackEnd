import { productsService } from "../services/service.js"
import { generateMockProducts } from "../utils/generateMockProducts.js"

import CustomError from "../services/errors/CustomError.js"
import { generateProductCreateErrorInfo } from "../services/errors/messages/productCreateErrorInfo.js"
import errorsEnum from "../services/errors/errors.enum.js"


export const getProducts = async (req, res) => {
    try {
        const {limit, page,query,sort} = req.query


        const products = await productsService.getProducts(limit, page, query, sort)
        res.json(products)
    } catch (error) {
        res.json(error)
    }
}
export const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsService.getProductById(id)

        if(!product){
            throw {status:404, msj: "Not found"}
        }

        res.json(product)
    } catch (error) {
        res.json(error)
    }
}
export const createProduct = async (req, res) => {
    try {
        const product = await productsService.createProduct(req.body)

        if (!product.status){
            CustomError.createError({
                name:"Product Create Error",
                cause:generateProductCreateErrorInfo(req.body),
                message:"Error al intentar crear producto",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.name,message:error.message})
    }
}
export const updateProduct = async (req, res) => {
    try{
        const {id} = req.params

        const newProduct = req.body
        const response = await productsService.updateProduct(id, newProduct)

        if(response.error){
            throw response
        }

        res.json({message: `Producto actualizado con éxito (ID: ${id})`})

    }catch (error) {
        res.status(error.status).json({message:error.msj})
    }
}
export const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params

        const response = await productsService.deleteProduct({_id: id}, {status:false})

        if(response.error){
            throw response
        }

        res.json({message: `Producto eliminado con éxito (ID: ${id})`})
    }catch (error) {
        console.log(error)
        res.status(error.status).json({message:error.msj})
    }
}


export const getMockingProducts = async (req, res) => {
    try {
        const {amount} = req.query
        let amountNumber = Number(amount)


        if(isNaN(amountNumber) || amountNumber < 1){
            amountNumber = undefined
        }

        res.json(generateMockProducts(amountNumber))
    } catch (error) {
        res.json(error)
    }
}
