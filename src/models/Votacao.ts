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

import Pauta from './Pauta';

@Entity('votacao')
class Votacao {
  @PrimaryGeneratedColumn('uuid')
  votacao_id: string;

  @Column()
  pauta_id: string;

  @ManyToOne(() => Pauta)
  @JoinColumn({ name: 'pauta_id' })
  reuniao: Pauta;

  @Column()
  dt_inicio: Date;

  @Column()
  dt_fim: Date;

  @Column()
  votos: number;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Votacao;
