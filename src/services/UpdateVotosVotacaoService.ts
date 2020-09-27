/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Votacao from '../models/Votacao';
import Opcao from '../models/Opcao';

interface Request {
  opcao_id: string;
}

class UpdateVotosVotacaoService {
  public async execute({ opcao_id }: Request): Promise<Votacao> {
    const opcaoRepository = getRepository(Opcao);

    const opcao = await opcaoRepository.findOne(opcao_id);

    const votacaoRepository = getRepository(Votacao);

    const votacao = await votacaoRepository.findOne(opcao?.votacao_id);

    if (!votacao) {
      throw new Error('Votacão não cadastrada!');
    }

    votacao.votos += 1;

    await votacaoRepository.save(votacao);

    return votacao;
  }
}

export default UpdateVotosVotacaoService;
