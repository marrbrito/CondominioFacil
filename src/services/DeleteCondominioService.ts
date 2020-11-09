/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Condominio from '../models/Condominio';

interface Request {
  id: string;
}

class DeleteCondominioService {
  public async execute({ id }: Request): Promise<Condominio> {
    const condominioRepository = getRepository(Condominio);

    const checkCondominioExists = await condominioRepository.findOne({
      where: { condominio_id: id },
    });

    if (!checkCondominioExists) {
      throw new Error('Condominio não cadastrado.');
    }

    await condominioRepository.delete({ condominio_id: id });

    return checkCondominioExists;
  }
}

export default DeleteCondominioService;
