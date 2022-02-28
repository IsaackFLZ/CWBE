import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Double, ManyToOne, JoinColumn } from "typeorm";
import { Usuarios } from "./Usuarios";
@Entity()
export class EncuestaCV {
    @PrimaryGeneratedColumn()
    id_encuesta: number;

    @ManyToOne(() => Usuarios, (Usuarios) => Usuarios.id_usuario, {cascade: true}) @JoinColumn({name: 'usuario_id', referencedColumnName: 'id_usuario'})
    @Column()
    usuario_id: number;

    @Column()
    question: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}