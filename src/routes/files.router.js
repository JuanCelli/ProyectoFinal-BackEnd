

import { Router } from "express";
import upload from "../utils/multer.js";


const router = Router()


router.post("/imgprofile",upload.single("imgProfile"),function (req, res, next) {
    console.log(req.file)
    res.json(req.file)
})
router.post("/imgproduct",upload.single("imgProduct"),function (req, res, next) {
    console.log(req.file)
    res.json(req.file)
})

export default router