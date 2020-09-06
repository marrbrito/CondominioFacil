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

import Reuniao from './Reuniao';

@Entity('pauta')
class Pauta {
  @PrimaryGeneratedColumn('uuid')
  pauta_id: string;

  @Column()
  reuniao_id: string;

  @ManyToOne(() => Reuniao)
  @JoinColumn({ name: 'reuniao_id' })
  reuniao: Reuniao;

  @Column()
  descricao: string;

  @Column()
  numero: number;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Pauta;
