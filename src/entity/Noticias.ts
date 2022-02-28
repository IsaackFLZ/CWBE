import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticias {
    @PrimaryGeneratedColumn()
    id_noticia: number;

    @Column()
    titular: string;

    @Column()
    @CreateDateColumn()
    fecha: Date;

    @Column()
    descripcion: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}