import Usuario from '../models/Usuario';
import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';

export default interface IUsuarioRepositorio {
  findById(id: string): Promise<Usuario | undefined>;
  findByEmail(email: string): Promise<Usuario | undefined>;
  create(data: ICreateUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
