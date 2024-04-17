

import { Router } from "express";
import upload from "../utils/multer.js";
import { productsService, userService } from "../services/service.js";


const router = Router()


router.post("/imgprofile/:id",upload.single("imgProfile"),async (req, res, next)=> {
    const {id} = req.params
    const {originalname,path} = req.file
    const reponse = await userService.UploadFile(id,path,originalname)

    res.json(req.file)
})
router.post("/imgproduct/:idProduct",upload.single("imgProduct"),async (req, res, next) => {
    const {idProduct} = req.params
    const {path} = req.file
    const reponse = await productsService.updateThumbnails(idProduct,path)

    res.json(req.file)
})

export default router