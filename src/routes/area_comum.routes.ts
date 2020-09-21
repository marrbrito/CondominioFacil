/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateAreaComumService from '../services/CreateAreaComumService';
import Area_Comum from '../models/Area_Comum';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const areacomumRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
areacomumRouter.use(ensureAuthenticated);

areacomumRouter.get('/', async (request, response) => {
  const areacomumRepository = getRepository(Area_Comum);
  const areacomum = await areacomumRepository.find();

  return response.json(areacomum);
});

// --Receber a requisição, chamar o service e devolver uma resposta
areacomumRouter.post('/', async (request, response) => {
  try {
    const { condominio_id, descricao, valor_locacao } = request.body;

    const createAreaComum = new CreateAreaComumService();

    const areacomum = await createAreaComum.execute({
      condominio_id,
      descricao,
      valor_locacao,
    });

    return response.json(areacomum);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default areacomumRouter;
