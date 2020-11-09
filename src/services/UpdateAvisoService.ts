/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Aviso from '../models/Aviso';

interface Request {
  id: string;
  descricao: string;
  dt_expiracao: Date;
}

class UpdateBlocoService {
  public async execute({
    id,
    descricao,
    dt_expiracao,
  }: Request): Promise<Aviso> {
    const avisoRepository = getRepository(Aviso);

    const checkAvisoExists = await avisoRepository.findOne({
      where: { aviso_id: id },
    });

    if (!checkAvisoExists) {
      throw new Error('Bloco não cadastrado.');
    }

    checkAvisoExists.descricao = descricao;
    checkAvisoExists.dt_expiracao = dt_expiracao;

    await avisoRepository.save(checkAvisoExists);

    return checkAvisoExists;
  }
}

export default UpdateBlocoService;
