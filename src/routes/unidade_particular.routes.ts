/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUnidadeParticularService from '../services/CreateUnidadeParticular';
import UpdateCondominoUnidadeService from '../services/UpdateCondominoUnidade';
import DeleteUnidadeService from '../services/DeleteUnidadeService';

import Unidade_Particular from '../models/Unidade_Particular';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const unidadeparticularRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// unidadeparticularRouter.use(ensureAuthenticated);

unidadeparticularRouter.get('/', async (request, response) => {
  const unidadeparticularRepository = getRepository(Unidade_Particular);
  let unidade: Unidade_Particular[];

  if (request.query.condominio_id && request.query.bloco_id) {
    unidade = await unidadeparticularRepository.find({
      where: {
        condominio_id: request.query.condominio_id,
        bloco_id: request.query.bloco_id,
      },
    });
  } else {
    unidade = await unidadeparticularRepository.find();
  }

  return response.json(unidade);
});

// --Receber a requisição, chamar o service e devolver uma resposta
unidadeparticularRouter.post('/', async (request, response) => {
  try {
    const {
      condominio_id,
      bloco_id,
      identificador,
      condomino_id,
    } = request.body;

    const createUnidadeParticular = new CreateUnidadeParticularService();

    const unidade_particular = await createUnidadeParticular.execute({
      condominio_id,
      bloco_id,
      identificador,
      condomino_id,
    });

    return response.json(unidade_particular);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// --Receber a requisição, chamar o service e devolver uma resposta
unidadeparticularRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { condomino_id, identificador } = request.body;

    const updateCondominoUnidade = new UpdateCondominoUnidadeService();

    const unidade_particular = await updateCondominoUnidade.execute({
      unidade_id: id,
      condomino_id,
      identificador,
    });

    return response.json(unidade_particular);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

unidadeparticularRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteUnidade = new DeleteUnidadeService();

    const unidade = await deleteUnidade.execute({
      id,
    });

    return response.json(unidade);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default unidadeparticularRouter;
