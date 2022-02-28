import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { TipoPuestos } from "../entity/TipoPuesto";

export class TipoPuestosController {

    static getAllP = async (request : Request, response : Response) => {
        const tipoPuestoRepository = getRepository(TipoPuestos);
        const tipoPuesto = await tipoPuestoRepository.query(`select * from tipo_puestos order by tipo_puestos.nombre asc`);
        if (tipoPuesto.length > 0) {
            response.send(tipoPuesto);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getAll = async (request : Request, response : Response) => {
        const { id } = request.params;
        const tipoPuestoRepository = getRepository(TipoPuestos);
        const tipoPuesto = await tipoPuestoRepository.query(`select tipo_puestos.id_tipoPuesto,tipo_puestos.nombre,tipo_puestos.descripcion , tipo_puestos.image_tipopuesto, oficina.id_oficina from oficina
        inner join puestos on oficina.id_oficina = puestos.oficina_id  
        inner join tipo_puestos on puestos.puestotipo_id = tipo_puestos.id_tipoPuesto 
        where id_oficina = ${id}
        group by tipo_puestos.nombre `);
        if (tipoPuesto.length > 0) {
            response.send(tipoPuesto);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getById = async (request: Request, response: Response) => {
        const tipoPuestoRepository = getRepository(TipoPuestos);
        const { id } = request.params;
        try {
            const tipoPuesto = await tipoPuestoRepository.findOneOrFail(id);
            tipoPuesto.id_tipoPuesto = null;
            response.send(tipoPuesto);
        } catch (error) {
            response.status(404).json({ message: 'Not result' })
        }
    }

    static createTipoPuesto = async (request : Request, response : Response) => {

        const tipoPuestoRepository = getRepository(TipoPuestos);
        const {nombre, descripcion, image_tipopuesto}  = request.body;
        
        let tipoPuesto : TipoPuestos = new TipoPuestos();
        tipoPuesto.nombre = nombre;
        tipoPuesto.descripcion = descripcion;
        tipoPuesto.image_tipopuesto = image_tipopuesto; 

        //Validate
        const validationOpt = { validationError : {target: false, value: false}};
        const errors = await validate(tipoPuesto, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            tipoPuesto = await tipoPuestoRepository.save(tipoPuesto);
        } catch (error) {
            return response.status(409).json({error})
        }

        response.status(200).send('Tipo de Puesto Creado')
        
    }

}

export default TipoPuestosController;