/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Area_Comum from '../models/Area_Comum';

interface Request {
  id: string;
  descricao: string;
  valor_locacao: number;
}

class UpdateAreaComumService {
  public async execute({
    id,
    descricao,
    valor_locacao,
  }: Request): Promise<Area_Comum> {
    const areacomumRepository = getRepository(Area_Comum);

    const checkAreaComumExists = await areacomumRepository.findOne({
      where: { area_id: id },
    });

    if (!checkAreaComumExists) {
      throw new Error('Área Comum não cadastrado.');
    }

    checkAreaComumExists.descricao = descricao;
    checkAreaComumExists.valor_locacao = valor_locacao;

    await areacomumRepository.save(checkAreaComumExists);

    return checkAreaComumExists;
  }
}

export default UpdateAreaComumService;
