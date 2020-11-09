/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateBlocoService from '../services/CreateBlocoService';
import UpdateBlocoService from '../services/UpdateBlocoService';
import DeleteBlocoService from '../services/DeleteBlocoService';
import Bloco from '../models/Bloco';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const blocoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// blocoRouter.use(ensureAuthenticated);

blocoRouter.get('/', async (request, response) => {
  const blocoRepository = getRepository(Bloco);
  let bloco: Bloco[];

  if (request.query.condominio_id) {
    bloco = await blocoRepository.find({
      where: {
        condominio_id: request.query.condominio_id,
      },
    });
  } else {
    bloco = await blocoRepository.find();
  }

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

blocoRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { descricao } = request.body;

    const updateBloco = new UpdateBlocoService();

    const bloco = await updateBloco.execute({
      id,
      descricao,
    });

    return response.json(bloco);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

blocoRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteBloco = new DeleteBlocoService();

    const bloco = await deleteBloco.execute({
      id,
    });

    return response.json(bloco);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default blocoRouter;
