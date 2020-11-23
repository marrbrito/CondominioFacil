/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Opcao from '../models/Opcao';

interface Request {
  id: string;
}

class DeleteOpcaoService {
  public async execute({ id }: Request): Promise<Opcao> {
    const opcaoRepository = getRepository(Opcao);

    const checkOpcaoExists = await opcaoRepository.findOne({
      where: { opcao_id: id },
    });

    if (!checkOpcaoExists) {
      throw new Error('Pauta não cadastrada.');
    }

    await opcaoRepository.delete({ opcao_id: id });

    return checkOpcaoExists;
  }
}

export default DeleteOpcaoService;
