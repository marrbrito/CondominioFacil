/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Opcao from '../models/Opcao';

interface Request {
  id: string;
  descricao: string;
}

class UpdateOpcaoService {
  public async execute({ id, descricao }: Request): Promise<Opcao> {
    const opcaoRepository = getRepository(Opcao);

    const checkOpcaoExists = await opcaoRepository.findOne({
      where: { opcao_id: id },
    });

    if (!checkOpcaoExists) {
      throw new Error('Opção não cadastrada.');
    }

    checkOpcaoExists.descricao = descricao;

    await opcaoRepository.save(checkOpcaoExists);

    return checkOpcaoExists;
  }
}

export default UpdateOpcaoService;
