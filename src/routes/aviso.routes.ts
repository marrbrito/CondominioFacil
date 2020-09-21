/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAvisoService from '../services/CreateAvisoService';
import Aviso from '../models/Aviso';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const avisoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
avisoRouter.use(ensureAuthenticated);

avisoRouter.get('/', async (request, response) => {
  const avisoRepository = getRepository(Aviso);
  const aviso = await avisoRepository.find();

  return response.json(aviso);
});

// --Receber a requisição, chamar o service e devolver uma resposta
avisoRouter.post('/', async (request, response) => {
  try {
    const { descricao, condominio_id, dt_expiracao } = request.body;

    const parsedDate = parseISO(dt_expiracao);

    const createAviso = new CreateAvisoService();

    const aviso = await createAviso.execute({
      descricao,
      condominio_id,
      dt_expiracao: parsedDate,
    });

    return response.json(aviso);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default avisoRouter;
