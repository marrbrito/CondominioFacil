/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Bloco from '../models/Bloco';

interface Request {
  descricao: string;
  condominio_id: string;
}

class CreateBlocoService {
  public async execute({ descricao, condominio_id }: Request): Promise<Bloco> {
    const blocoRepository = getRepository(Bloco);

    const checkBlocoExists = await blocoRepository.findOne({
      where: { descricao, condominio_id },
    });

    if (checkBlocoExists) {
      throw new Error('Bloco já cadastrado para este condominio.');
    }

    const bloco = blocoRepository.create({
      descricao,
      condominio_id,
    });

    await blocoRepository.save(bloco);

    return bloco;
  }
}

export default CreateBlocoService;
