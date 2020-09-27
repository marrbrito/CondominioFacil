/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateVotoService from '../services/CreateVotoService';
import UpdateVotosVotacaoService from '../services/UpdateVotosVotacaoService';
import Voto from '../models/Voto';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const votoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
votoRouter.use(ensureAuthenticated);

votoRouter.get('/', async (request, response) => {
  const votoRepository = getRepository(Voto);
  const voto = await votoRepository.find();

  return response.json(voto);
});

// --Receber a requisição, chamar o service e devolver uma resposta
votoRouter.post('/', async (request, response) => {
  try {
    const { opcao_id, condomino_id } = request.body;

    const createVoto = new CreateVotoService();

    const voto = await createVoto.execute({
      opcao_id,
      condomino_id,
    });

    const updateVotos = new UpdateVotosVotacaoService();

    await updateVotos.execute({
      opcao_id,
    });

    return response.json(voto);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default votoRouter;
