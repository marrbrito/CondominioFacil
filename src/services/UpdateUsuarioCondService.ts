import { getRepository } from 'typeorm';

import Usuario from '../models/Usuario';

/* eslint-disable camelcase */
interface Request {
  user_id: string;
  condomino_id: string;
}

class UpdateUsuarioCondService {
  public async execute({ user_id, condomino_id }: Request): Promise<Usuario> {
    const userRepository = getRepository(Usuario);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Usuário não auntenticado!');
    }

    user.condomino_id = condomino_id;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUsuarioCondService;
