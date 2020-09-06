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

import Votacao from './Votacao';

@Entity('Opcao')
class Opcao {
  @PrimaryGeneratedColumn('uuid')
  opcao_id: string;

  @Column()
  pauta_id: string;

  @Column()
  votacao_id: string;

  @ManyToOne(() => Votacao)
  @JoinColumn({ name: 'pauta_id, votacao_id' })
  votacao: Votacao;

  @Column()
  descricao: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Opcao;
