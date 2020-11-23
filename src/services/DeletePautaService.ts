/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Pauta from '../models/Pauta';

interface Request {
  id: string;
}

class DeletePautaService {
  public async execute({ id }: Request): Promise<Pauta> {
    const pautaRepository = getRepository(Pauta);

    const checkPautaExists = await pautaRepository.findOne({
      where: { pauta_id: id },
    });

    if (!checkPautaExists) {
      throw new Error('Pauta não cadastrada.');
    }

    await pautaRepository.delete({ pauta_id: id });

    return checkPautaExists;
  }
}

export default DeletePautaService;
