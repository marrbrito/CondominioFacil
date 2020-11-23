/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Votacao from '../models/Votacao';

interface Request {
  id: string;
}

class DeleteVotacaoService {
  public async execute({ id }: Request): Promise<Votacao> {
    const votacaoRepository = getRepository(Votacao);

    const checkVotacaoExists = await votacaoRepository.findOne({
      where: { votacao_id: id },
    });

    if (!checkVotacaoExists) {
      throw new Error('Votação não cadastrada.');
    }

    await votacaoRepository.delete({ votacao_id: id });

    return checkVotacaoExists;
  }
}

export default DeleteVotacaoService;
