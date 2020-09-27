/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Unidade_Particular from '../models/Unidade_Particular';
import Condomino from '../models/Condomino';

/* eslint-disable camelcase */
interface Request {
  unidade_id: string;
  condomino_id: string;
}

class UpdateCondominioUnidadeService {
  public async execute({
    unidade_id,
    condomino_id,
  }: Request): Promise<Unidade_Particular> {
    const unidadeRepository = getRepository(Unidade_Particular);

    const unidade = await unidadeRepository.findOne(unidade_id);

    if (!unidade) {
      throw new Error('Unidade Particular não cadastrada!');
    }

    const condominoRepository = getRepository(Condomino);

    const condomino = await condominoRepository.findOne(condomino_id);

    if (!condomino) {
      throw new Error(
        'Não foi possível atualizar a unidade particular. Condomino não cadastrado!',
      );
    }

    unidade.condomino_id = condomino_id;

    await unidadeRepository.save(unidade);

    return unidade;
  }
}

export default UpdateCondominioUnidadeService;
