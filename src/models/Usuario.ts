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

import Condomino from './Condomino';

@Entity('usuario')
class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  password: string;

  @Column()
  tipo: string;

  @Column()
  email: string;

  @Column()
  condomino_id: string;

  @ManyToOne(() => Condomino)
  @JoinColumn({ name: 'condomino_id' })
  condomino: Condomino;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Usuario;
