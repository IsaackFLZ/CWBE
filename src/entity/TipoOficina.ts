import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class TipoOficina {

    @PrimaryGeneratedColumn()
    id_tipoOficina: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

}