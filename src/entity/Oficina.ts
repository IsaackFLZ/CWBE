import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Double, ManyToOne, JoinColumn } from "typeorm";
import { Regional } from "./Regional";
import { TipoOficina } from "./TipoOficina";

@Entity()

export class Oficina {
    @PrimaryGeneratedColumn()
    id_oficina: number;

    @ManyToOne(() => TipoOficina, (TipoOficina) => TipoOficina.id_tipoOficina, {cascade: false}) @JoinColumn({name: 'oficinatipo_id', referencedColumnName: 'id_tipoOficina'})
    @Column()
    oficinatipo_id : number;

    @Column()
    descripcion: string;

    @Column()
    image_oficina: string;


    @ManyToOne(() => Regional, (Regional) => Regional.id_regional, {cascade: true}) @JoinColumn({name: 'regional_id', referencedColumnName: 'id_regional'})
    @Column()
    regional_id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}