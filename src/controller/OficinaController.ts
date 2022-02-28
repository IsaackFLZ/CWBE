import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Oficina } from "../entity/Oficina";

export class OficinaController {

    static getAllO = async (request : Request, response : Response) => {
        const oficinaRepository = getRepository(Oficina);
        const oficinas = await oficinaRepository.find({order: { regional_id : "ASC"}});
        if (oficinas.length > 0) {
            response.send(oficinas);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getAll = async (request : Request, response : Response) => {
        const { id } = request.params;
        const oficinaRepository = getRepository(Oficina);
        const oficina = await oficinaRepository.query(`
            select oficina.id_oficina, tipo_oficina.nombre as nombre, oficina.descripcion, oficina.image_oficina, oficina.regional_id
            from oficina inner join tipo_oficina on oficina.oficinatipo_id = tipo_oficina.id_tipoOficina
            inner join regional on oficina.regional_id = regional.id_regional
            where regional.id_regional = ${id};
        `);
        if (oficina.length > 0) {
            response.send(oficina);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getById = async (request: Request, response: Response) => {
        const oficinaRepository = getRepository(Oficina);
        const { id } = request.params;
        try {
            const oficina = await oficinaRepository.findOneOrFail(id);
            response.send(oficina);
        } catch (error) {
            response.status(404).json({ message: 'Not result' })
        }
    }



    static createOficina = async (request : Request, response : Response) => {

        const oficinaRepository = getRepository(Oficina);
        const {oficinatipo_id, descripcion, regional_id, image_oficina}  = request.body;
        
        let oficina : Oficina = new Oficina();
        oficina.oficinatipo_id = oficinatipo_id;
        oficina.descripcion = descripcion;
        oficina.regional_id = regional_id;
        oficina.image_oficina = image_oficina;


        //Validate
        const validationOpt = { validationError : {target: false, value: false}};
        const errors = await validate(oficina, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            oficina = await oficinaRepository.save(oficina);
        } catch (error) {
            return response.status(409).json({error})
        }

        response.status(200).send('Oficina Created')
        
    }

}

export default OficinaController;