import { Router } from "express";
import RegionalController from "../controller/RegionalController";

const router = Router();

router.get('/getInfo', RegionalController.getInfo);
router.get('/regionales', RegionalController.getAll);
router.get('/:id', RegionalController.getById);
router.post('/crear_regional', RegionalController.createRegional)



export default router;