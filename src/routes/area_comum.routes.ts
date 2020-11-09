/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateAreaComumService from '../services/CreateAreaComumService';
import UpdateAreaComumService from '../services/UpdateAreaComumService';
import DeleteAreaComumService from '../services/DeleteAreaComumService';

import Area_Comum from '../models/Area_Comum';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const areacomumRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// areacomumRouter.use(ensureAuthenticated);

areacomumRouter.get('/', async (request, response) => {
  const areacomumRepository = getRepository(Area_Comum);
  let area: Area_Comum[];

  if (request.query.condominio_id) {
    area = await areacomumRepository.find({
      where: {
        condominio_id: request.query.condominio_id,
      },
    });
  } else {
    area = await areacomumRepository.find();
  }

  return response.json(area);
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

areacomumRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { descricao, valor_locacao } = request.body;

    const updateAreaComum = new UpdateAreaComumService();

    const area = await updateAreaComum.execute({
      id,
      descricao,
      valor_locacao,
    });

    return response.json(area);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

areacomumRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteAreaComum = new DeleteAreaComumService();

    const area = await deleteAreaComum.execute({
      id,
    });

    return response.json(area);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default areacomumRouter;
