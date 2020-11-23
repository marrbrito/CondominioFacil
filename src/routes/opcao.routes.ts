/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateOpcaoService from '../services/CreateOpcaoService';
import UpdateOpcaoService from '../services/UpdateOpcaoService';
import DeleteOpcaoService from '../services/DeleteOpcaoService';

import Opcao from '../models/Opcao';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const opcaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// opcaoRouter.use(ensureAuthenticated);

opcaoRouter.get('/', async (request, response) => {
  const opcaoRepository = getRepository(Opcao);
  let opcao: Opcao[];

  if (request.query.votacao_id && request.query.pauta_id) {
    opcao = await opcaoRepository.find({
      where: {
        votacao_id: request.query.votacao_id,
        pauta_id: request.query.pauta_id,
      },
    });
  } else {
    opcao = await opcaoRepository.find();
  }

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

opcaoRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { descricao } = request.body;

    const updateOpcao = new UpdateOpcaoService();

    const opcao = await updateOpcao.execute({
      id,
      descricao,
    });

    return response.json(opcao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

opcaoRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteOpcao = new DeleteOpcaoService();

    const opcao = await deleteOpcao.execute({
      id,
    });

    return response.json(opcao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default opcaoRouter;
