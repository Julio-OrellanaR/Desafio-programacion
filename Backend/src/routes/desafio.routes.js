import { Router } from "express";
import { methods as desafioController } from "../controller/desafio.controller"

const router = Router()

// routes
router.get("/", desafioController.getRaiz)
router.post("/File", desafioController.postArchivo)
router.get("/showInformation", desafioController.showReport)

export default router