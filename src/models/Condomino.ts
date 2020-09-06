/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from './Usuario';

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

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Condomino;
