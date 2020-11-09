/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Aviso from '../models/Aviso';

interface Request {
  id: string;
}

class DeleteAvisoService {
  public async execute({ id }: Request): Promise<Aviso> {
    const avisoRepository = getRepository(Aviso);

    const checkAvisoExists = await avisoRepository.findOne({
      where: { aviso_id: id },
    });

    if (!checkAvisoExists) {
      throw new Error('Aviso não cadastrado.');
    }

    await avisoRepository.delete({ aviso_id: id });

    return checkAvisoExists;
  }
}

export default DeleteAvisoService;
