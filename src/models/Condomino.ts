/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('condomino')
class Condomino {
  @PrimaryGeneratedColumn('uuid')
  condomino_id: string;

  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  dt_nascimento: Date;

  @Column()
  sexo: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Condomino;
