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

import Pessoa_Autorizada from './Pessoa_Autorizada';

@Entity('autorizacao')
class Autorizacao {
  @PrimaryGeneratedColumn('uuid')
  autorizacao_id: string;

  @Column()
  pessoa_aut_id: string;

  @ManyToOne(() => Pessoa_Autorizada)
  @JoinColumn({ name: 'pessoa_aut_id' })
  pessoa_autorizada: Pessoa_Autorizada;

  @Column()
  tipo_acesso: string;

  @Column()
  dt_fim: Date;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Autorizacao;
