/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePautaService from '../services/CreatePautaService';
import UpdatePautaService from '../services/UpdatePautaService';
import DeletePautaService from '../services/DeletePautaService';

import Pauta from '../models/Pauta';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pautaRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// pautaRouter.use(ensureAuthenticated);

pautaRouter.get('/', async (request, response) => {
  const pautaRepository = getRepository(Pauta);
  let pauta: Pauta[];

  if (request.query.reuniao_id) {
    pauta = await pautaRepository.find({
      where: {
        reuniao_id: request.query.reuniao_id,
      },
    });
  } else {
    pauta = await pautaRepository.find();
  }

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

pautaRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { descricao, numero } = request.body;

    const updatePauta = new UpdatePautaService();

    const pauta = await updatePauta.execute({
      id,
      descricao,
      numero,
    });

    return response.json(pauta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

pautaRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletePauta = new DeletePautaService();

    const pauta = await deletePauta.execute({
      id,
    });

    return response.json(pauta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pautaRouter;
