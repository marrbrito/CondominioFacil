/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

import { injectable, inject } from 'tsyringe';

// import AppError from '../errors/AppError';
import IUsuarioRepositorio from '../repositories/IUsuarioRepositorio';
import IUsuarioToken from '../repositories/IUsuarioTokenRepositorio';

// import Usuario from '../models/Usuario';
interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsuarioRepositorio')
    private usuarioRepositorio: IUsuarioRepositorio,

    @inject('UsuarioTokenRepositorio')
    private usuarioTokenRepositorio: IUsuarioToken,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const usuarioToken = await this.usuarioTokenRepositorio.findByToken(token);

    if (!usuarioToken) {
      throw new Error('Token inválido, tente novamente!');
    }

    const usuario = await this.usuarioRepositorio.findById(
      usuarioToken?.usuario_id,
    );

    if (!usuario) {
      throw new Error('Usuario não cadstrado');
    }

    const tokenDataCriacao = usuarioToken.dt_criacao;
    const compareDate = addHours(tokenDataCriacao, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Tempo para reset da senha expirado!');
    }

    usuario.password = await hash(password, 8);

    await this.usuarioRepositorio.save(usuario);
  }
}

export default ResetPasswordService;
