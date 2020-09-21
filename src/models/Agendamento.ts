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

import Area_Comum from './Area_Comum';
import Condomino from './Condomino';

@Entity('agendamento')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  agendamento_id: string;

  @Column()
  area_id: string;

  @Column()
  condominio_id: string;

  @ManyToOne(() => Area_Comum)
  @JoinColumn([{ name: 'area_id' }, { name: 'condominio_id' }])
  area_comum: Area_Comum;

  @Column()
  condomino_id: string;

  @ManyToOne(() => Condomino)
  @JoinColumn({ name: 'condomino_id' })
  condomino: Condomino;

  @Column()
  dt_reserva: Date;

  @Column()
  turno: 'primeiro' | 'segundo' | 'terceiro';

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Agendamento;
