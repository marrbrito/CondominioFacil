/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('condominio')
class Condominio {
  @PrimaryGeneratedColumn('uuid')
  condominio_id: string;

  @Column()
  nome: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  sindico: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Condominio;
