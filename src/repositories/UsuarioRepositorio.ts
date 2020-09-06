import { EntityRepository, Repository } from 'typeorm';

import Usuario from '../models/Usuario';

@EntityRepository(Usuario)
class UsuarioRepository extends Repository<Usuario> {
  public async findUsuario(nome: string): Promise<Usuario | null> {
    const findUsuario = await this.findOne({
      where: { nome },
    });

    return findUsuario || null;
  }
}

export default UsuarioRepository;
