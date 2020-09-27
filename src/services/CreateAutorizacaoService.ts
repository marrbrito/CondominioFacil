/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Autorizacao from '../models/Autorizacao';

interface Request {
  pessoa_aut_id: string;
  tipo_acesso: string;
  dt_fim: Date;
}

class CreateAutorizacaoService {
  public async execute({
    pessoa_aut_id,
    tipo_acesso,
    dt_fim,
  }: Request): Promise<Autorizacao> {
    const autorizacaoRepository = getRepository(Autorizacao);

    if (tipo_acesso !== 'permanente' && tipo_acesso !== 'normal') {
      throw new Error('Tipo Acesso inválido.');
    }

    const checkPessoaAutorizadaExists = await autorizacaoRepository.findOne({
      where: { pessoa_aut_id },
    });

    if (checkPessoaAutorizadaExists) {
      throw new Error('Pessoa Autorizada já possui autorização.');
    }

    const autorizacao = autorizacaoRepository.create({
      pessoa_aut_id,
      tipo_acesso,
      dt_fim,
    });

    await autorizacaoRepository.save(autorizacao);

    return autorizacao;
  }
}

export default CreateAutorizacaoService;
