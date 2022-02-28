import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Puestos } from "../entity/Puestos";

export class PuestoController {

    static getAll = async (request : Request, response : Response) => {
        const { id } = request.params;
        const puestoRepository = getRepository(Puestos);
        const puesto = await puestoRepository.query(`
            select puestos.id_puesto, puestos.puestotipo_id, puestos.nombre, puestos.descripcion, puestos.estado, tipo_puestos.nombre as tipo_puesto
            from puestos inner join tipo_puestos on puestos.puestotipo_id = tipo_puestos.id_tipoPuesto
            inner join oficina on puestos.oficina_id = oficina.id_oficina
            where oficina.id_oficina = ${id} order by puestos.id_puesto asc;`
        );
        if (puesto.length > 0) {
            response.send(puesto);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getAllp = async (request : Request, response : Response) => {
        const { id,idof } = request.params;
        const puestoRepository = getRepository(Puestos);
        const puesto = await puestoRepository.query(`
        select tipo_puestos.id_tipoPuesto,tipo_puestos.nombre as nombreTipo, puestos.id_puesto, puestos.nombre, puestos.estado, puestos.cantidad, puestos.descripcion from oficina
        inner join puestos on oficina.id_oficina = puestos.oficina_id  
        inner join tipo_puestos on puestos.puestotipo_id = tipo_puestos.id_tipoPuesto 
        where tipo_puestos.id_tipoPuesto = ${id} and id_oficina =${idof}`
        );
        if (puesto.length > 0) {
            response.send(puesto);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getById = async (request: Request, response: Response) => {
        const puestoRepository = getRepository(Puestos);
        const { id } = request.params;
        try {
            const puesto = await puestoRepository.findOneOrFail(id);
            puesto.id_puesto = null;
            response.send(puesto);
        } catch (error) {
            response.status(404).json({ message: 'Not result' })
        }
    }

    static createPuesto = async (request : Request, response : Response) => {

        const puestoRepository = getRepository(Puestos);
        const {nombre, descripcion, cantidad, estado , oficina_id, puestotipo_id}  = request.body;
        
        let puesto : Puestos = new Puestos();
        
        puesto.nombre = nombre;
        puesto.descripcion = descripcion;
        puesto.cantidad = cantidad;
        puesto.estado = estado;
        puesto.oficina_id = oficina_id;
        puesto.puestotipo_id = puestotipo_id;

        //Validate
        const validationOpt = { validationError : {target: false, value: false}};
        const errors = await validate(puesto, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            puesto = await puestoRepository.save(puesto);
        } catch (error) {
            return response.status(409).json({error})
        }

        response.status(200).send('Puesto Creado')
        
    }

    static editPuesto = async (request: Request, response: Response) => {

        const puestoRepository = getRepository(Puestos);
        let puestos: Puestos;
        const { id } = request.params;
        const {estado} = request.body;
        try {
            puestos = await puestoRepository.findOneOrFail(id);
        } catch (error) {
            return response.status(404).json({ message: 'Possition not found' })
        }
        puestos.estado = estado;

        //Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(puestos, validationOpt);

        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            await puestoRepository.save(puestos);
        } catch (error) {
            return response.status(409).json({ message: 'Error cant create Poss' })
        }

        response.status(200).send("Puesto Actualizado");

    };

}

export default PuestoController;