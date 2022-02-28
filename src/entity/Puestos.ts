import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { TipoPuestos } from "./TipoPuesto";
import { Oficina } from "./Oficina";

@Entity()
export class Puestos {
    
    @PrimaryGeneratedColumn()
    id_puesto: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    cantidad: string;

    @Column()
    estado: string;

    @ManyToOne(() => Oficina, (Oficina) => Oficina.id_oficina,{cascade: false}) @JoinColumn({name: 'oficina_id', referencedColumnName: 'id_oficina'})
    @Column()
    oficina_id: number;

    @ManyToOne(() => TipoPuestos, (TipoPuestos) => TipoPuestos.id_tipoPuesto,{cascade: false}) @JoinColumn({name: 'puestotipo_id', referencedColumnName: 'id_tipoPuesto'})
    @Column()
    puestotipo_id : number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}