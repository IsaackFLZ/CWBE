import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Reserva } from "../entity/Reserva";

export class ReservaController {


    static getByIdPoss= async (request : Request, response : Response) => {
        const {id_puesto} = request.params;
        const reservaRepository = getRepository(Reserva);
        const regional = await reservaRepository.query(
        `select usuarios.email, puestos.id_puesto, puestos.descripcion, reserva.hora_incio, reserva.hora_fin, reserva.createdAt, reserva.id_reserva
        from reserva inner join usuarios on reserva.usuario_id = usuarios.id_usuario
        inner join puestos on reserva.puesto_id = puestos.id_puesto
        where reserva.puesto_id = ${id_puesto}`);
        if (regional.length > 0) {
            response.send(regional);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getAll = async (request : Request, response : Response) => {
        const reservaRepository = getRepository(Reserva);
        const regional = await reservaRepository.find();
        if (regional.length > 0) {
            response.send(regional);
        }else{
            response.status(404).json({message : 'Not Results'});
        }
    }

    static getById = async (request: Request, response: Response) => {
        const reservaRepository = getRepository(Reserva);
        const { id } = request.params;
        try {
            const regional = await reservaRepository.findOneOrFail(id);
            response.send(regional);
        } catch (error) {
            response.status(404).json({ message: 'Not result' })
        }
    }

    static createReserva = async (request : Request, response : Response) => {

        const reservaRepository = getRepository(Reserva);
        const {hora_incio,hora_fin,fecha_reserva,usuario_id,puesto_id,estado}  = request.body;
        
        let reserva : Reserva = new Reserva();
        reserva.hora_incio = hora_incio;
        reserva.hora_fin = hora_fin;
        reserva.fecha_reserva = fecha_reserva;
        reserva.usuario_id = usuario_id;
        reserva.puesto_id = puesto_id;
        reserva.estado = estado;

        //Validate
        const validationOpt = { validationError : {target: false, value: false}};
        const errors = await validate(reserva, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            reserva = await reservaRepository.save(reserva);
        } catch (error) {
            return response.status(409).json({error})
        }

        response.status(200).send('Reserva Created')
        
    }

    static editReserva = async (request: Request, response: Response) => {
        const reservaRepository = getRepository(Reserva);
        let reserva: Reserva;
        const { id } = request.params;
        const {hora_incio,hora_fin,fecha_reserva,usuario_id,puesto_id,estado}  = request.body;
        try {
            reserva = await reservaRepository.findOneOrFail(id);
        } catch (error) {
            return response.status(404).json({ message: 'Reserva not found' })
        }
        reserva.hora_incio = hora_incio;
        reserva.hora_fin = hora_fin;
        reserva.fecha_reserva = fecha_reserva;
        reserva.usuario_id = usuario_id;
        reserva.puesto_id = puesto_id;
        reserva.estado = estado;

        //Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(reserva, validationOpt);

        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            await reservaRepository.save(reserva);
        } catch (error) {
            return response.status(409).json({ message: 'Reserva already exist' })
        }

        response.status(200).send('Reserva update');

    };

    static deleteReserva = async (request: Request, response: Response) => {
        const reservaRepository = getRepository(Reserva);
        let reserva: Reserva;
        const { id } = request.params;
        try {
            reserva = await reservaRepository.findOneOrFail(id);
        } catch (error) {
            return response.status(404).json({ message: 'Reserva not found' })
        }

        // Remove Reserva
        reservaRepository.delete(id);
        response.status(200).send('Reserva deleted');

    };

}

export default ReservaController;