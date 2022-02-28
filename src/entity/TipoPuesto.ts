import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class TipoPuestos {
    
    @PrimaryGeneratedColumn()
    id_tipoPuesto: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    image_tipopuesto: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}