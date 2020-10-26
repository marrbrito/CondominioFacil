/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { startOfDay } from 'date-fns';

import Reuniao from '../models/Reuniao';

interface Request {
  condominio_id: string;
  descricao: string;
  data: Date;
}

class CreateReuniaoService {
  public async execute({
    condominio_id,
    descricao,
    data,
  }: Request): Promise<Reuniao> {
    const reuniaoRepository = getRepository(Reuniao);

    const dt_reuniao = startOfDay(data);

    const checkReuniaoExists = await reuniaoRepository.findOne({
      where: { condominio_id, descricao, dt_reuniao },
    });

    if (checkReuniaoExists) {
      throw new Error('Reunião nesta data já cadastrada para este condominio.');
    }

    const reuniao = reuniaoRepository.create({
      condominio_id,
      descricao,
      dt_reuniao,
    });

    await reuniaoRepository.save(reuniao);

    return reuniao;
  }
}

export default CreateReuniaoService;
