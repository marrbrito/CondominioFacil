/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Opcao from '../models/Opcao';

interface Request {
  votacao_id: string;
  pauta_id: string;
  descricao: string;
}

class CreateOpcaoService {
  public async execute({
    votacao_id,
    pauta_id,
    descricao,
  }: Request): Promise<Opcao> {
    const opcaoRepository = getRepository(Opcao);

    const checkOpcaoExists = await opcaoRepository.findOne({
      where: { votacao_id, pauta_id, descricao },
    });

    if (checkOpcaoExists) {
      throw new Error(
        'Opção da votação já cadastrada para esta pauta de reunião.',
      );
    }

    const opcao = opcaoRepository.create({
      votacao_id,
      pauta_id,
      descricao,
    });

    await opcaoRepository.save(opcao);

    return opcao;
  }
}

export default CreateOpcaoService;
