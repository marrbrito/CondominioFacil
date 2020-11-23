/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Votacao from '../models/Votacao';

interface Request {
  id: string;
  dt_inicio: Date;
  dt_fim: Date;
}

class UpdateVotacaoService {
  public async execute({ id, dt_inicio, dt_fim }: Request): Promise<Votacao> {
    const votacaoRepository = getRepository(Votacao);

    const checkVotacaoExists = await votacaoRepository.findOne({
      where: { votacao_id: id },
    });

    if (!checkVotacaoExists) {
      throw new Error('Votação não cadastrada.');
    }

    checkVotacaoExists.dt_inicio = dt_inicio;
    checkVotacaoExists.dt_fim = dt_fim;

    await votacaoRepository.save(checkVotacaoExists);

    return checkVotacaoExists;
  }
}

export default UpdateVotacaoService;
