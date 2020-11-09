/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Bloco from '../models/Bloco';

interface Request {
  id: string;
}

class DeleteBlocoService {
  public async execute({ id }: Request): Promise<Bloco> {
    const blocoRepository = getRepository(Bloco);

    const checkBlocoExists = await blocoRepository.findOne({
      where: { bloco_id: id },
    });

    if (!checkBlocoExists) {
      throw new Error('Bloco não cadastrado.');
    }

    await blocoRepository.delete({ bloco_id: id });

    return checkBlocoExists;
  }
}

export default DeleteBlocoService;
