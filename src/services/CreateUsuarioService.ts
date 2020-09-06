/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

// import AppError from '../errors/AppError';
import Usuario from '../models/Usuario';

interface Request {
  nome: string;
  email: string;
  password: string;
  tipo: string;
}

class CreateUsuarioService {
  public async execute({
    nome,
    email,
    password,
    tipo,
  }: Request): Promise<Usuario> {
    const usersRepository = getRepository(Usuario);

    const checkUsuarioExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUsuarioExists) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await hash(password, 8);

    const usuario = usersRepository.create({
      nome,
      email,
      password: hashedPassword,
      tipo,
    });

    await usersRepository.save(usuario);

    return usuario;
  }
}

export default CreateUsuarioService;
