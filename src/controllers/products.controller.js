import { productsService } from "../services/service.js"
import { generateMockProducts } from "../utils/generateMockProducts.js"

import CustomError from "../services/errors/CustomError.js"
import { generateProductCreateErrorInfo } from "../services/errors/messages/productCreateErrorInfo.js"
import errorsEnum from "../services/errors/errors.enum.js"


export const getProducts = async (req, res,next) => {
    try {
        const {limit, page,query,sort} = req.query


        const products = await productsService.getProducts(limit, page, query, sort)
        res.json(products)
    } catch (error) {
        next(error)
    }
}
export const getProductById = async (req, res,next) => {
    try {
        const {id} = req.params
        const product = await productsService.getProductById(id)

        if(!product._id){
            CustomError.createError({
                name:"Product Get Error",
                cause:null,
                message:"Producto no econtrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        res.json(product)
    } catch (error) {
        next(error)
    }
}
export const createProduct = async (req, res,next) => {
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
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}
export const updateProduct = async (req, res,next) => {
    try{
        const {id} = req.params
        
        const product = await productsService.getProductById(id)
        
        const newProduct = req.body
        
        if(req.user.role!=="admin"){
            if(req.user.email!==product.owner){
                CustomError.createError({
                    name:"Authorized Error",
                    cause:null,
                    message:"El usuario no tiene permisos para modificar este producto.",
                    code: errorsEnum.NOT_AUTHORIZED_ERROR,
                })
            }
        }

        const response = await productsService.updateProduct(id, newProduct)

        if(response.error){
            CustomError.createError({
                name:"Product Update Error",
                cause:null,
                message:"Error al intentar actualizar producto",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }

        res.json({message: `Producto actualizado con éxito (ID: ${id})`})

    }catch (error) {
        next(error)
    }
}
export const deleteProduct = async (req, res,next) => {
    try{
        const {id} = req.params
        const product = await productsService.getProductById(id)

        if(!product._id){
            CustomError.createError({
                name:"Product Delete Error",
                cause:null,
                message:"Producto no econtrado",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        if(req.user.role!=="admin"){
            if(req.user.role!==product.owner){
                CustomError.createError({
                    name:"Authorized Error",
                    cause:null,
                    message:"El usuario no tiene permisos para eliminar este producto.",
                    code: errorsEnum.NOT_AUTHORIZED_ERROR,
                })
            }
        }

        const response = await productsService.deleteProduct({_id: id}, {status:false})

        if(response.error){
            CustomError.createError({
                name:"Product Delete Error",
                cause:null,
                message:"Error al intentar eliminar producto, producto no econtrado",
            })
        }

        res.json({message: `Producto eliminado con éxito (ID: ${id})`})
    }catch (error) {
        next(error)
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
