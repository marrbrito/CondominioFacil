/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCondominoService from '../services/CreateCondominoService';
import UpdateUsuarioCondService from '../services/UpdateUsuarioCondService';
import Condomino from '../models/Condomino';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const condominoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
condominoRouter.use(ensureAuthenticated);

condominoRouter.get('/', async (request, response) => {
  const condominoRepository = getRepository(Condomino);
  const condomino = await condominoRepository.find();

  return response.json(condomino);
});

// --Receber a requisição, chamar outro arquivo e devolver uma resposta
condominoRouter.post('/', async (request, response) => {
  try {
    const { cpf, nome, dt_nascimento, sexo, celular, email } = request.body;

    const createCondomino = new CreateCondominoService();

    const condomino = await createCondomino.execute({
      cpf,
      nome,
      dt_nascimento,
      sexo,
      celular,
      email,
      usuario_id: request.user.id,
    });

    const updateUsuarioCondService = new UpdateUsuarioCondService();

    const user = await updateUsuarioCondService.execute({
      usuario_id: request.user.id,
    });

    const nomeUsuario = user.nome;

    return response.json({ condomino, nomeUsuario });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default condominoRouter;
