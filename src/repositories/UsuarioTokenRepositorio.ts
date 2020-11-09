/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IUsuarioTokenRepositorio from './IUsuarioTokenRepositorio';

import UsuarioToken from '../models/Usuario_Token';

class UsuarioTokenRepositorio implements IUsuarioTokenRepositorio {
  private ormRepository: Repository<UsuarioToken>;

  constructor() {
    this.ormRepository = getRepository(UsuarioToken);
  }

  public async findByToken(token: string): Promise<UsuarioToken | undefined> {
    const usuarioToken = await this.ormRepository.findOne({ where: { token } });

    return usuarioToken;
  }

  public async generate(usuario_id: string): Promise<UsuarioToken> {
    const usuarioToken = await this.ormRepository.create({ usuario_id });

    await this.ormRepository.save(usuarioToken);

    return usuarioToken;
  }
}

export default UsuarioTokenRepositorio;
