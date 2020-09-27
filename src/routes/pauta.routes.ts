/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePautaService from '../services/CreatePautaService';
import Pauta from '../models/Pauta';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pautaRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
pautaRouter.use(ensureAuthenticated);

pautaRouter.get('/', async (request, response) => {
  const pautaRepository = getRepository(Pauta);
  const pauta = await pautaRepository.find();

  return response.json(pauta);
});

// --Receber a requisição, chamar o service e devolver uma resposta
pautaRouter.post('/', async (request, response) => {
  try {
    const { reuniao_id, descricao, numero } = request.body;

    const createPauta = new CreatePautaService();

    const pauta = await createPauta.execute({
      reuniao_id,
      descricao,
      numero,
    });

    return response.json(pauta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pautaRouter;
