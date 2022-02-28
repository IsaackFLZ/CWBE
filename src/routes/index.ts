import { Router } from "express";
import auth from "./auth";
import regional from "./regional";
import oficina from "./oficina";
import reserva from "./reserva";
import puestos from "./puestos";
import tipopuestos from "./tipoPuesto";
import tipoficinas from "./tipoOficina";
import users from "./users";

const routes = Router();

routes.use('/auth', auth);
routes.use('/regional', regional);
routes.use('/oficina', oficina);
routes.use('/puestos', puestos);
routes.use('/tipopuestos', tipopuestos);
routes.use('/tipoficinas', tipoficinas);
routes.use('/reserva', reserva);
routes.use('/users', users)


export default routes;