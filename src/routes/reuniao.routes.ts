/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateReuniaoService from '../services/CreateReuniaoService';
import Reuniao from '../models/Reuniao';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const reuniaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
reuniaoRouter.use(ensureAuthenticated);

reuniaoRouter.get('/', async (request, response) => {
  const reuniaoRepository = getRepository(Reuniao);
  const reuniao = await reuniaoRepository.find();

  return response.json(reuniao);
});

// --Receber a requisição, chamar o service e devolver uma resposta
reuniaoRouter.post('/', async (request, response) => {
  try {
    const { condominio_id, descricao, dt_reuniao } = request.body;

    const createReuniao = new CreateReuniaoService();

    const dataparsed = parseISO(dt_reuniao);

    const reuniao = await createReuniao.execute({
      condominio_id,
      descricao,
      data: dataparsed,
    });

    return response.json(reuniao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default reuniaoRouter;
