/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Bloco from '../models/Bloco';

interface Request {
  id: string;
  descricao: string;
}

class UpdateBlocoService {
  public async execute({ id, descricao }: Request): Promise<Bloco> {
    const blocoRepository = getRepository(Bloco);

    const checkBlocoExists = await blocoRepository.findOne({
      where: { bloco_id: id },
    });

    if (!checkBlocoExists) {
      throw new Error('Bloco não cadastrado.');
    }

    checkBlocoExists.descricao = descricao;

    await blocoRepository.save(checkBlocoExists);

    return checkBlocoExists;
  }
}

export default UpdateBlocoService;
