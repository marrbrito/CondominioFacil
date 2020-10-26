import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// import AppError from '../errors/AppError';
import authConfig from '../config/auth';

import IUsuarioRepositorio from '../repositories/IUsuarioRepositorio';
import Usuario from '../models/Usuario';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

class AuthenticateUserService {
  constructor(private usuarioRepositorio: IUsuarioRepositorio) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usuario = await this.usuarioRepositorio.findByEmail(email);

    if (!usuario) {
      throw new Error('Email/password combinação incorreta');
    }

    const passwordMached = await compare(password, usuario.password);

    if (!passwordMached) {
      throw new Error('Email/password combinação incorreta');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { usuario, token };
  }
}

export default AuthenticateUserService;
