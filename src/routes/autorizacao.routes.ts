/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateAutorizacaoService from '../services/CreateAutorizacaoService';
import UpdateAutorizacaoService from '../services/UpdateAutorizacaoService';
import DeleteAutorizacaoService from '../services/DeleteAutorizacaoService';

import Autorizacao from '../models/Autorizacao';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const autorizacaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// autorizacaoRouter.use(ensureAuthenticated);

autorizacaoRouter.get('/', async (request, response) => {
  const autorizacaoRepository = getRepository(Autorizacao);
  let autorizacao: Autorizacao[];

  if (request.query.pessoa_aut_id) {
    autorizacao = await autorizacaoRepository.find({
      where: {
        pessoa_aut_id: request.query.pessoa_aut_id,
      },
    });
  } else {
    autorizacao = await autorizacaoRepository.find();
  }

  return response.json(autorizacao);
});

// --Receber a requisição, chamar o service e devolver uma resposta
autorizacaoRouter.post('/', async (request, response) => {
  try {
    const { pessoa_aut_id, tipo_acesso, dt_fim } = request.body;

    const createAutorizacao = new CreateAutorizacaoService();

    const autorizacao = await createAutorizacao.execute({
      pessoa_aut_id,
      tipo_acesso,
      dt_fim,
    });

    return response.json(autorizacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

autorizacaoRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { tipo_acesso, dt_fim } = request.body;

    const updateAutorizacao = new UpdateAutorizacaoService();

    const autorizacao = await updateAutorizacao.execute({
      id,
      tipo_acesso,
      dt_fim,
    });

    return response.json(autorizacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

autorizacaoRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteAutorizacao = new DeleteAutorizacaoService();

    const autorizacao = await deleteAutorizacao.execute({
      id,
    });

    return response.json(autorizacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default autorizacaoRouter;
