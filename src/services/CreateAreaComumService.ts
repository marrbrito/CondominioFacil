/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Area_Comum from '../models/Area_Comum';

interface Request {
  condominio_id: string;
  descricao: string;
  valor_locacao: number;
}

class CreateAreaComumService {
  public async execute({
    condominio_id,
    descricao,
    valor_locacao,
  }: Request): Promise<Area_Comum> {
    const areacomumRepository = getRepository(Area_Comum);

    const checkAreaComumExists = await areacomumRepository.findOne({
      where: { condominio_id, descricao },
    });

    if (checkAreaComumExists) {
      throw new Error('Área Comum já cadastrado para este condominio.');
    }

    if (valor_locacao < 0) {
      throw new Error('Valor Locação inválido.');
    }

    const areacomum = areacomumRepository.create({
      condominio_id,
      descricao,
      valor_locacao,
    });

    await areacomumRepository.save(areacomum);

    return areacomum;
  }
}

export default CreateAreaComumService;
