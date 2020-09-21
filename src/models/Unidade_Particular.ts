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
import Condomino from './Condomino';

@Entity('unidade_particular')
class Unidade_Particular {
  @PrimaryGeneratedColumn('uuid')
  unidade_id: string;

  @Column()
  condominio_id: string;

  @Column()
  bloco_id: string;

  @ManyToOne(() => Bloco)
  @JoinColumn([{ name: 'bloco_id' }, { name: 'condominio_id' }])
  condominio: Bloco;

  @Column()
  identificador: string;

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

export default Unidade_Particular;
