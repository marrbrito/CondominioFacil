/* eslint-disable camelcase */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UsuarioRepository from '../repositories/UsuarioRepositorio';
import CreateUserService from '../services/CreateUsuarioService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usuarioRepository = getCustomRepository(UsuarioRepository);
  const usuario = await usuarioRepository.find();

  return response.json(usuario);
});

// --Receber a requisição, chamar o service e devolver uma resposta
usersRouter.post('/', async (request, response) => {
  try {
    const { nome, email, password, tipo } = request.body;

    const createUser = new CreateUserService();

    const usuario = await createUser.execute({
      nome,
      email,
      password,
      tipo,
    });

    delete usuario.password;

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
