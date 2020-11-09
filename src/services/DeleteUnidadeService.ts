/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Unidade from '../models/Unidade_Particular';

interface Request {
  id: string;
}

class DeleteUnidadeService {
  public async execute({ id }: Request): Promise<Unidade> {
    const unidadeRepository = getRepository(Unidade);

    const checkUnidadeExists = await unidadeRepository.findOne({
      where: { unidade_id: id },
    });

    if (!checkUnidadeExists) {
      throw new Error('Unidade não cadastrado.');
    }

    await unidadeRepository.delete({ unidade_id: id });

    return checkUnidadeExists;
  }
}

export default DeleteUnidadeService;
