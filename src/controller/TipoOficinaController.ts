import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { TipoOficina } from "../entity/TipoOficina";

export class TipoOficinaController {

    static getAll = async (request : Request, response : Response) => {
        const tipoOficinaRepository = getRepository(TipoOficina);
        const tipoOficina = await tipoOficinaRepository.find();
        if (tipoOficina.length > 0) {
            response.send(tipoOficina);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getById = async (request: Request, response: Response) => {
        const tipoOficinaRepository = getRepository(TipoOficina);
        const { id } = request.params;
        try {
            const tipoOficina = await tipoOficinaRepository.findOneOrFail(id);
            response.send(tipoOficina);
        } catch (error) {
            response.status(404).json({ message: 'Not result' })
        }
    }

    static createTipoOficina = async (request : Request, response : Response) => {

        const tipoOficinaRepository = getRepository(TipoOficina);
        const {nombre, descripcion}  = request.body;
        
        let tipoOficina : TipoOficina = new TipoOficina();
        tipoOficina.nombre = nombre;
        tipoOficina.descripcion = descripcion;

        //Validate
        const validationOpt = { validationError : {target: false, value: false}};
        const errors = await validate(tipoOficina, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            tipoOficina = await tipoOficinaRepository.save(tipoOficina);
        } catch (error) {
            return response.status(409).json({error})
        }

        response.status(200).send('Tipo de Oficina Creado')
        
    }

}

export default TipoOficinaController;