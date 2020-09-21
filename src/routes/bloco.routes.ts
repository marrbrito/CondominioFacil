/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateBlocoService from '../services/CreateBlocoService';
import Bloco from '../models/Bloco';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const blocoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
blocoRouter.use(ensureAuthenticated);

blocoRouter.get('/', async (request, response) => {
  const blocoRepository = getRepository(Bloco);
  const bloco = await blocoRepository.find();

  return response.json(bloco);
});

// --Receber a requisição, chamar o service e devolver uma resposta
blocoRouter.post('/', async (request, response) => {
  try {
    const { descricao, condominio_id } = request.body;

    const createBloco = new CreateBlocoService();

    const bloco = await createBloco.execute({
      descricao,
      condominio_id,
    });

    return response.json(bloco);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default blocoRouter;
