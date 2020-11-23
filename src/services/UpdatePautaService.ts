/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Pauta from '../models/Pauta';

interface Request {
  id: string;
  descricao: string;
  numero: number;
}

class UpdatePautaService {
  public async execute({ id, descricao, numero }: Request): Promise<Pauta> {
    const pautaRepository = getRepository(Pauta);

    const checkPautaExists = await pautaRepository.findOne({
      where: { pauta_id: id },
    });

    if (!checkPautaExists) {
      throw new Error('Pauta não cadastrada.');
    }

    checkPautaExists.descricao = descricao;
    checkPautaExists.numero = numero;

    await pautaRepository.save(checkPautaExists);

    return checkPautaExists;
  }
}

export default UpdatePautaService;
