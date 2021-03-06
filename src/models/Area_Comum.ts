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

@Entity('area_comum')
class Area_Comum {
  @PrimaryGeneratedColumn('uuid')
  area_id: string;

  @Column()
  condominio_id: string;

  @ManyToOne(() => Condominio)
  @JoinColumn({ name: 'condominio_id' })
  condominio: Condominio;

  @Column()
  descricao: string;

  @Column()
  valor_locacao: number;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Area_Comum;
