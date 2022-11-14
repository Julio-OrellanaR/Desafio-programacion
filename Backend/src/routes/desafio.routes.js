import { Router } from "express";
import { methods as desafioController } from "../controller/desafio.controller"

const router = Router()

// routes
router.get("/", desafioController.getRaiz)

export default router