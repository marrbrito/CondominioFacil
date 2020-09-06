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

import Condominio from './Condominio';

@Entity('bloco')
class Bloco {
  @PrimaryGeneratedColumn('uuid')
  bloco_id: string;

  @Column()
  descricao: string;

  @Column()
  condominio_id: string;

  @ManyToOne(() => Condominio)
  @JoinColumn({ name: 'condominio_id' })
  condominio: Condominio;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Bloco;
