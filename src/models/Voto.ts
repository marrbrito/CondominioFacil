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

import Opcao from './Opcao';
import Condomino from './Condomino';

@Entity('voto')
class Voto {
  @PrimaryGeneratedColumn('uuid')
  voto_id: string;

  @Column()
  opcao_id: string;

  @ManyToOne(() => Opcao)
  @JoinColumn({ name: 'opcao_id' })
  opcao: Opcao;

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

export default Voto;
