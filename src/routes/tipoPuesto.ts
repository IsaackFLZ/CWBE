import { Router } from "express";
import TipoPuestoController from "../controller/TipoPuestosController";


const router = Router();

router.get('/tipopuesto/all', TipoPuestoController.getAllP);
router.get('/tipopuesto/:id', TipoPuestoController.getAll);
router.get('/tipopuesto/info/:id', TipoPuestoController.getById);
router.post('/create_tipopuesto', TipoPuestoController.createTipoPuesto);

export default router;