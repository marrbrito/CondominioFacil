/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateVotacaoService from '../services/CreateVotacaoService';
import Votacao from '../models/Votacao';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const votacaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
votacaoRouter.use(ensureAuthenticated);

votacaoRouter.get('/', async (request, response) => {
  const votacaoRepository = getRepository(Votacao);
  const votacao = await votacaoRepository.find();

  return response.json(votacao);
});

// --Receber a requisição, chamar o service e devolver uma resposta
votacaoRouter.post('/', async (request, response) => {
  try {
    const { pauta_id, dt_inicio, dt_fim } = request.body;

    const createVotacao = new CreateVotacaoService();

    const pauta = await createVotacao.execute({
      pauta_id,
      dt_inicio,
      dt_fim,
    });

    return response.json(pauta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default votacaoRouter;
