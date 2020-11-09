/* eslint-disable camelcase */
import UsuarioToken from '../models/Usuario_Token';

export default interface IUsuarioTokenRepositorio {
  generate(usuario_id: string): Promise<UsuarioToken>;
  findByToken(token: string): Promise<UsuarioToken | undefined>;
}
