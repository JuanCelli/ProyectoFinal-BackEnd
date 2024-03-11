import { Router } from "express";
import { loggersTest } from "../controllers/loggers.controller.js";


const router = Router()

router.get("/",loggersTest)


export default router