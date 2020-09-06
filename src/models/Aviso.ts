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

@Entity('aviso')
class Aviso {
  @PrimaryGeneratedColumn('uuid')
  aviso_id: string;

  @Column()
  condominio_id: string;

  @ManyToOne(() => Condominio)
  @JoinColumn({ name: 'condominio_id' })
  condominio: Condominio;

  @Column()
  descricao: string;

  @Column()
  dt_expiracao: Date;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Aviso;
