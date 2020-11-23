/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Autorizacao from '../models/Autorizacao';

interface Request {
  id: string;
}

class DeleteAutorizacaoService {
  public async execute({ id }: Request): Promise<Autorizacao> {
    const autorizacaoRepository = getRepository(Autorizacao);

    const checkAutorizacaoExists = await autorizacaoRepository.findOne({
      where: { autorizacao_id: id },
    });

    if (!checkAutorizacaoExists) {
      throw new Error('Bloco não cadastrado.');
    }

    await autorizacaoRepository.delete({ autorizacao_id: id });

    return checkAutorizacaoExists;
  }
}

export default DeleteAutorizacaoService;
