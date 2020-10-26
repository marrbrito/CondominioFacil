/* eslint-disable camelcase */
import { Router } from 'express';

import UsuarioRepositorio from '../repositories/UsuarioRepositorio';

import CreateUserService from '../services/CreateUsuarioService';

const usersRouter = Router();

// --Receber a requisição, chamar o service e devolver uma resposta
usersRouter.post('/', async (request, response) => {
  try {
    const { nome, email, password, tipo } = request.body;

    const usuarioRepositorio = new UsuarioRepositorio();

    const createUser = new CreateUserService(usuarioRepositorio);

    const usuario = await createUser.execute({
      nome,
      email,
      password,
      tipo,
    });

    // delete usuario.password;

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
