import CustomError from "../services/errors/CustomError.js"
import errorsEnum from "../services/errors/errors.enum.js"
import { productsService, userService } from "../services/service.js"


export const uploadImgProfile = async (req, res,next) => {
    try {
        const typeDoc = "imgProfile"
        const {id} = req.params

        const {originalname,path} = req.file
        const reponse = await userService.UploadFile(id,path,originalname,typeDoc)
    
        res.json(req.file)
    } catch (error) {
        next(error)
    }
}


export const uploadImgProduct = async (req, res,next) => {
    try {
        const {id} = req.params
        const {path} = req.file
        const reponse = await productsService.updateThumbnails(id,path)

        if(reponse.error){
            CustomError.createError({
                name:"Update Img Product Error",
                cause:null,
                message:"El al intententar actualizar imagen del producto.",
            })
        }

        res.json(req.file)
    } catch (error) {
        next(error)
    }
}

export const uploadDoc = async (req, res, next) => {
    try {
        const {id,typeDoc} = req.params
        const {originalname,path} = req.file
        const reponse = await userService.UploadFile(id,path,originalname,typeDoc)
    
        res.json(req.file)
    } catch (error) {
        next(error)
    }
}