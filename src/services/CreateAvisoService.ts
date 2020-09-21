/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Aviso from '../models/Aviso';

interface Request {
  condominio_id: string;
  descricao: string;
  dt_expiracao: Date;
}

class CreateAvisoComumService {
  public async execute({
    condominio_id,
    descricao,
    dt_expiracao,
  }: Request): Promise<Aviso> {
    const avisoRepository = getRepository(Aviso);

    const checkAvisoComumExists = await avisoRepository.findOne({
      where: { condominio_id, descricao },
    });

    if (checkAvisoComumExists) {
      throw new Error('Aviso já cadastrado para este condominio.');
    }

    const aviso = avisoRepository.create({
      condominio_id,
      descricao,
      dt_expiracao,
    });

    await avisoRepository.save(aviso);

    return aviso;
  }
}

export default CreateAvisoComumService;
