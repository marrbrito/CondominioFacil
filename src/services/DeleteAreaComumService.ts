/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Area_Comum from '../models/Area_Comum';

interface Request {
  id: string;
}

class DeleteAreaComumService {
  public async execute({ id }: Request): Promise<Area_Comum> {
    const blocoRepository = getRepository(Area_Comum);

    const checkBlocoExists = await blocoRepository.findOne({
      where: { area_id: id },
    });

    if (!checkBlocoExists) {
      throw new Error('Bloco não cadastrado.');
    }

    await blocoRepository.delete({ area_id: id });

    return checkBlocoExists;
  }
}

export default DeleteAreaComumService;
