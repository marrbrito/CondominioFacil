/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateAutorizacaoService from '../services/CreateAutorizacaoService';
import Autorizacao from '../models/Autorizacao';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const autorizacaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
autorizacaoRouter.use(ensureAuthenticated);

autorizacaoRouter.get('/', async (request, response) => {
  const autorizacaoRepository = getRepository(Autorizacao);
  const autorizacao = await autorizacaoRepository.find();

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

export default autorizacaoRouter;
