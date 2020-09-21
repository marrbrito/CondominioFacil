/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { startOfDay } from 'date-fns';

import Agendamento from '../models/Agendamento';
import Unidade_Particular from '../models/Unidade_Particular';

interface Request {
  condominio_id: string;
  area_id: string;
  data: Date;
  turno: string;
  condomino_id: string;
}

class CreateAgendamentoComumService {
  public async execute({
    condominio_id,
    area_id,
    data,
    turno,
    condomino_id,
  }: Request): Promise<Agendamento> {
    const unidadeparticularRepository = getRepository(Unidade_Particular);

    const checkUnidadeParticularCondominoExists = await unidadeparticularRepository.findOne(
      {
        where: { condominio_id, condomino_id },
      },
    );

    if (!checkUnidadeParticularCondominoExists) {
      throw new Error(
        'O condômino deve estar associado a uma unidade particular para efetuar um agendamento.',
      );
    }

    if (turno !== 'primeiro' && turno !== 'segundo' && turno !== 'terceiro') {
      throw new Error('Turno inválido.');
    }

    const agendamentoRepository = getRepository(Agendamento);

    const dt_reserva = startOfDay(data);

    const checkAgendamentoCondominoSelfExists = await agendamentoRepository.findOne(
      {
        where: { condominio_id, area_id, dt_reserva, turno, condomino_id },
      },
    );

    if (checkAgendamentoCondominoSelfExists) {
      throw new Error(
        'Área Comum já reservada por você neste turno para esta data.',
      );
    }

    const checkAgendamentoExists = await agendamentoRepository.findOne({
      where: { condominio_id, area_id, dt_reserva, turno },
    });

    const msg = 'Área Comum já reservada neste turno para esta data => Apto: ';

    if (checkAgendamentoExists) {
      throw new Error(
        msg.concat(checkUnidadeParticularCondominoExists.identificador),
      );
    }

    const agendamento = agendamentoRepository.create({
      condominio_id,
      area_id,
      dt_reserva,
      turno,
      condomino_id,
    });

    await agendamentoRepository.save(agendamento);

    return agendamento;
  }
}

export default CreateAgendamentoComumService;
