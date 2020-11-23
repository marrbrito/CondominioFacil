/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Reuniao from '../models/Reuniao';

interface Request {
  id: string;
}

class DeleteReuniaoService {
  public async execute({ id }: Request): Promise<Reuniao> {
    const reuniaoRepository = getRepository(Reuniao);

    const checkReuniaoExists = await reuniaoRepository.findOne({
      where: { reuniao_id: id },
    });

    if (!checkReuniaoExists) {
      throw new Error('Reunião não cadastrada.');
    }

    await reuniaoRepository.delete({ reuniao_id: id });

    return checkReuniaoExists;
  }
}

export default DeleteReuniaoService;
