/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import PessoaAutorizada from '../models/Pessoa_Autorizada';

interface Request {
  id: string;
  nome: string;
  num_doc: string;
}

class UpdatePessoaAutorizadaService {
  public async execute({ id, nome, num_doc }: Request): Promise<PessoaAutorizada> {
    const pessoaAutorizadaRepository = getRepository(PessoaAutorizada);

    const checkPessoaExists = await pessoaAutorizadaRepository.findOne({
      where: { pessoa_aut_id: id },
    });

    if (!checkPessoaExists) {
      throw new Error('Pessoa autorizada não cadastrada.');
    }

    checkPessoaExists.nome = nome;
    checkPessoaExists.num_doc = num_doc;

    await pessoaAutorizadaRepository.save(checkPessoaExists);

    return checkPessoaExists;
  }
}

export default UpdatePessoaAutorizadaService;
