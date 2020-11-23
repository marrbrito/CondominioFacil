/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import PessoaAutorizada from '../models/Pessoa_Autorizada';

interface Request {
  id: string;
}

class DeletePessoaAutorizadaService {
  public async execute({ id }: Request): Promise<PessoaAutorizada> {
    const pessoaAutorizadaRepository = getRepository(PessoaAutorizada);

    const checkPessoaAutorizadaExists = await pessoaAutorizadaRepository.findOne(
      {
        where: { pessoa_aut_id: id },
      },
    );

    if (!checkPessoaAutorizadaExists) {
      throw new Error('Bloco não cadastrado.');
    }

    await pessoaAutorizadaRepository.delete({ pessoa_aut_id: id });

    return checkPessoaAutorizadaExists;
  }
}

export default DeletePessoaAutorizadaService;
