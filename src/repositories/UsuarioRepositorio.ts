import { getRepository, Repository } from 'typeorm';

import IUsuarioRepositorio from './IUsuarioRepositorio';
import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';

import Usuario from '../models/Usuario';

class UsuarioRepositorio implements IUsuarioRepositorio {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = getRepository(Usuario);
  }

  public async findById(id: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne(id);

    return usuario;
  }

  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne({
      where: { email },
    });

    return usuario;
  }

  public async create(userData: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = this.ormRepository.create(userData);

    await this.ormRepository.save(userData);

    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }
}

export default UsuarioRepositorio;
