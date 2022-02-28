import { Router } from "express";
import PuestoController from "../controller/PuestoController";


const router = Router();

router.get('/puesto/:id', PuestoController.getAll);
router.get('/puesto/:id/:idof', PuestoController.getAllp);
router.get('/puesto/info/:id', PuestoController.getById);
router.post('/crear_puesto', PuestoController.createPuesto)
router.put('/editar_puesto/:id', PuestoController.editPuesto)



export default router;