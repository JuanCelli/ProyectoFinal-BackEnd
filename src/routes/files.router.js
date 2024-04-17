

import { Router } from "express";
import upload from "../utils/multer.js";
import { validationId } from "../middleware/validationId.js";
import { uploadDoc, uploadImgProduct, uploadImgProfile } from "../controllers/files.controlles.js";
import { validationIdUser } from "../middleware/validationIdUser.js";
import { validationTypeDoc } from "../middleware/validationTypeDoc.js";
import { valitionExistenceProduct } from "../middleware/validationExistenceP.js";


const router = Router()

router.post("/imgprofile/:id",validationId,validationIdUser,upload.single("imgProfile"),uploadImgProfile)

router.post("/imgproduct/:id",validationId,valitionExistenceProduct,upload.single("imgProduct"),uploadImgProduct)

router.post("/:typeDoc/:id",validationId,validationIdUser,validationTypeDoc,upload.single("document"),uploadDoc)

export default router