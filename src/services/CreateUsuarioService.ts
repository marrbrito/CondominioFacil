/* eslint-disable camelcase */
import { hash } from 'bcryptjs';

// import AppError from '../errors/AppError';
import IUsuarioRepositorio from '../repositories/IUsuarioRepositorio';

import Usuario from '../models/Usuario';

interface IRequest {
  nome: string;
  email: string;
  password: string;
  tipo: string;
}

class CreateUsuarioService {
  constructor(private usuarioRepositorio: IUsuarioRepositorio) {}

  public async execute({
    nome,
    email,
    password,
    tipo,
  }: IRequest): Promise<Usuario> {
    const checkUsuarioExists = await this.usuarioRepositorio.findByEmail(email);

    if (checkUsuarioExists) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await hash(password, 8);

    const usuario = await this.usuarioRepositorio.create({
      nome,
      email,
      password: hashedPassword,
      tipo,
    });

    return usuario;
  }
}

export default CreateUsuarioService;
