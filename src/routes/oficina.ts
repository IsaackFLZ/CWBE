import { Router } from "express";
import OficinaController from "../controller/OficinaController";

const router = Router();

router.get('/all_oficinas', OficinaController.getAllO);
router.get('/oficinas/:id', OficinaController.getAll);
router.get('/:id', OficinaController.getById);
router.post('/crear_oficina', OficinaController.createOficina);



export default router;