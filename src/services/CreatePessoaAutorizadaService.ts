/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Pessoa_Autorizada from '../models/Pessoa_Autorizada';

interface Request {
  unidade_id: string;
  condominio_id: string;
  bloco_id: string;
  nome: string;
  num_doc: string;
}

class CreatePessoaAutorizadaService {
  public async execute({
    unidade_id,
    condominio_id,
    bloco_id,
    nome,
    num_doc,
  }: Request): Promise<Pessoa_Autorizada> {
    const pessoaautorizadaRepository = getRepository(Pessoa_Autorizada);

    const checkPessoaAutorizadaNmExists = await pessoaautorizadaRepository.findOne(
      {
        where: { condominio_id, bloco_id, unidade_id, nome },
      },
    );

    if (checkPessoaAutorizadaNmExists) {
      throw new Error(
        'Pessoa Autorizada já cadastrado para esta unidade particular.',
      );
    }

    const checkPessoaAutorizadaDocExists = await pessoaautorizadaRepository.findOne(
      {
        where: { condominio_id, bloco_id, unidade_id, num_doc },
      },
    );

    if (checkPessoaAutorizadaDocExists) {
      throw new Error('Documento já cadastrado para esta unidade particular.');
    }
    const pessoaautorizada = pessoaautorizadaRepository.create({
      unidade_id,
      condominio_id,
      bloco_id,
      nome,
      num_doc,
    });

    await pessoaautorizadaRepository.save(pessoaautorizada);

    return pessoaautorizada;
  }
}

export default CreatePessoaAutorizadaService;
