/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Autorizacao from '../models/Autorizacao';

interface Request {
  id: string;
  tipo_acesso: string;
  dt_fim: Date;
}

class UpdateAutorizacaoService {
  public async execute({ id, tipo_acesso, dt_fim }: Request): Promise<Autorizacao> {
    const autorizacaoRepository = getRepository(Autorizacao);

    const checkAutorizacaoExists = await autorizacaoRepository.findOne({
      where: { autorizacao_id: id },
    });

    if (!checkAutorizacaoExists) {
      throw new Error('Autorização não cadastrada.');
    }

    checkAutorizacaoExists.tipo_acesso = tipo_acesso;
    checkAutorizacaoExists.dt_fim = dt_fim;

    await autorizacaoRepository.save(checkAutorizacaoExists);

    return checkAutorizacaoExists;
  }
}

export default UpdateAutorizacaoService;
