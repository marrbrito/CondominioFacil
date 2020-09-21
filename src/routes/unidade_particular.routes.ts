/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUnidadeParticularService from '../services/CreateUnidadeParticular';
import Unidade_Particular from '../models/Unidade_Particular';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const unidadeparticularRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
unidadeparticularRouter.use(ensureAuthenticated);

unidadeparticularRouter.get('/', async (request, response) => {
  const unidadeparticularRepository = getRepository(Unidade_Particular);
  const unidadeparticular = await unidadeparticularRepository.find();

  return response.json(unidadeparticular);
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

export default unidadeparticularRouter;
