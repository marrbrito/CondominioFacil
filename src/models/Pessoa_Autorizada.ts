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

import Unidade_Particular from './Unidade_Particular';

@Entity('pessoa_autorizada')
class Pessoa_Autorizada {
  @PrimaryGeneratedColumn('uuid')
  pessoa_aut_id: string;

  @Column()
  undade_id: string;

  @Column()
  condominio_id: string;

  @Column()
  bloco_id: string;

  @ManyToOne(() => Unidade_Particular)
  @JoinColumn({ name: 'unidade_id, condominio_id, bloco_id' })
  unidade_particular: Unidade_Particular;

  @Column()
  nome: string;

  @Column()
  num_doc: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Pessoa_Autorizada;
