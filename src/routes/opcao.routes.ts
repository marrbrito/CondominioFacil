/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateOpcaoService from '../services/CreateOpcaoService';
import Opcao from '../models/Opcao';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const opcaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
opcaoRouter.use(ensureAuthenticated);

opcaoRouter.get('/', async (request, response) => {
  const opcaoRepository = getRepository(Opcao);
  const opcao = await opcaoRepository.find();

  return response.json(opcao);
});

// --Receber a requisição, chamar o service e devolver uma resposta
opcaoRouter.post('/', async (request, response) => {
  try {
    const { votacao_id, pauta_id, descricao } = request.body;

    const createOpcao = new CreateOpcaoService();

    const opcao = await createOpcao.execute({
      votacao_id,
      pauta_id,
      descricao,
    });

    return response.json(opcao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default opcaoRouter;
