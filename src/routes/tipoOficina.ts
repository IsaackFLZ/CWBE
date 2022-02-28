import { Router } from "express";
import TipoOficinaController from "../controller/TipoOficinaController";


const router = Router();

router.get('/tipoficina/all', TipoOficinaController.getAll);
router.get('/tipoficina/info/:id', TipoOficinaController.getById);
router.post('/crear_tipoficina', TipoOficinaController.createTipoOficina);

export default router;