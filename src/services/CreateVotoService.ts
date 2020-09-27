/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Voto from '../models/Voto';

interface Request {
  opcao_id: string;
  condomino_id: string;
}

class CreateVotoService {
  public async execute({ opcao_id, condomino_id }: Request): Promise<Voto> {
    const votoRepository = getRepository(Voto);

    const checkVotoExists = await votoRepository.findOne({
      where: { opcao_id, condomino_id },
    });

    if (checkVotoExists) {
      throw new Error('Voto já cadastrado para esta votação.');
    }

    const voto = votoRepository.create({
      opcao_id,
      condomino_id,
    });

    await votoRepository.save(voto);

    return voto;
  }
}

export default CreateVotoService;
