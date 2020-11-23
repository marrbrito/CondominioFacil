/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Reuniao from '../models/Reuniao';

interface Request {
  id: string;
  descricao: string;
  dt_reuniao: Date;
}

class UpdateReuniaoService {
  public async execute({
    id,
    descricao,
    dt_reuniao,
  }: Request): Promise<Reuniao> {
    const reuniaoRepository = getRepository(Reuniao);

    const checkReuniaoExists = await reuniaoRepository.findOne({
      where: { reuniao_id: id },
    });

    if (!checkReuniaoExists) {
      throw new Error('Reunião não cadastrada.');
    }

    checkReuniaoExists.descricao = descricao;
    checkReuniaoExists.dt_reuniao = dt_reuniao;

    await reuniaoRepository.save(checkReuniaoExists);

    return checkReuniaoExists;
  }
}

export default UpdateReuniaoService;
