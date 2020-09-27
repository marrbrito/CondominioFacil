/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Votacao from '../models/Votacao';

interface Request {
  pauta_id: string;
  dt_inicio: Date;
  dt_fim: Date;
}

class CreateVotacaoService {
  public async execute({
    pauta_id,
    dt_inicio,
    dt_fim,
  }: Request): Promise<Votacao> {
    const votacaoRepository = getRepository(Votacao);

    if (dt_inicio >= dt_fim) {
      throw new Error(
        'A data de inicio da votação deve ser menor que a data de fim.',
      );
    }

    const checkVotacaoExists = await votacaoRepository.findOne({
      where: { pauta_id },
    });

    if (checkVotacaoExists) {
      throw new Error('Votação já cadastrada para esta pauta de reunião.');
    }

    const votacao = votacaoRepository.create({
      pauta_id,
      dt_inicio,
      dt_fim,
      votos: 0,
    });

    await votacaoRepository.save(votacao);

    return votacao;
  }
}

export default CreateVotacaoService;
