import { getRepository } from 'typeorm';

import Usuario from '../models/Usuario';

/* eslint-disable camelcase */
interface Request {
  usuario_id: string;
}

class UpdateUsuarioCondService {
  public async execute({ usuario_id }: Request): Promise<Usuario> {
    const userRepository = getRepository(Usuario);

    const user = await userRepository.findOne(usuario_id);

    if (!user) {
      throw new Error('Usuário não auntenticado!');
    }

    return user;
  }
}

export default UpdateUsuarioCondService;
