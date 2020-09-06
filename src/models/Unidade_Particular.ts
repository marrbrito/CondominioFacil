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

import Bloco from './Bloco';

@Entity('unidade_particular')
class Unidade_Particular {
  @PrimaryGeneratedColumn('uuid')
  unidade_id: string;

  @Column()
  condominio_id: string;

  @Column()
  bloco_id: string;

  @ManyToOne(() => Bloco)
  @JoinColumn({ name: 'condominio_id, bloco_id' })
  condominio: Bloco;

  @Column()
  identificador: string;

  @Column()
  condomino: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Unidade_Particular;
