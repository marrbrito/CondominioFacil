/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Pauta from '../models/Pauta';

interface Request {
  reuniao_id: string;
  descricao: string;
  numero: number;
}

class CreatePautaService {
  public async execute({
    reuniao_id,
    descricao,
    numero,
  }: Request): Promise<Pauta> {
    const pautaRepository = getRepository(Pauta);

    const checkPautaExists = await pautaRepository.findOne({
      where: { reuniao_id, descricao },
    });

    if (checkPautaExists) {
      throw new Error('Pauta da reunião já cadastrada.');
    }

    const pauta = pautaRepository.create({
      reuniao_id,
      descricao,
      numero,
    });

    await pautaRepository.save(pauta);

    return pauta;
  }
}

export default CreatePautaService;
