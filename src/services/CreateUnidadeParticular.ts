/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Unidade_Particular from '../models/Unidade_Particular';

interface Request {
  condominio_id: string;
  bloco_id: string;
  identificador: string;
  condomino_id: string;
}

class CreateUnidadeParticularService {
  public async execute({
    condominio_id,
    bloco_id,
    identificador,
    condomino_id,
  }: Request): Promise<Unidade_Particular> {
    const unidadeparticularRepository = getRepository(Unidade_Particular);

    const checkUnidadeParticularExists = await unidadeparticularRepository.findOne(
      {
        where: { condominio_id, bloco_id, identificador },
      },
    );

    if (checkUnidadeParticularExists) {
      throw new Error(
        'Unidade Particular já cadastrada para este condominio/bloco.',
      );
    }

    const unidade_particular = unidadeparticularRepository.create({
      condominio_id,
      bloco_id,
      identificador,
      condomino_id,
    });

    await unidadeparticularRepository.save(unidade_particular);

    return unidade_particular;
  }
}

export default CreateUnidadeParticularService;
