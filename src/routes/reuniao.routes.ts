/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateReuniaoService from '../services/CreateReuniaoService';
import UpdateReuniaoService from '../services/UpdateReuniaoService';
import DeleteReuniaoService from '../services/DeleteReuniaoService';
import Reuniao from '../models/Reuniao';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const reuniaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// reuniaoRouter.use(ensureAuthenticated);

reuniaoRouter.get('/', async (request, response) => {
  const reuniaoRepository = getRepository(Reuniao);
  let reuniao: Reuniao[];

  if (request.query.condominio_id) {
    reuniao = await reuniaoRepository.find({
      where: {
        condominio_id: request.query.condominio_id,
      },
    });
  } else {
    reuniao = await reuniaoRepository.find();
  }

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

reuniaoRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { descricao, dt_reuniao } = request.body;

    const parsedDate = parseISO(dt_reuniao);

    const updateReuniao = new UpdateReuniaoService();

    const reuniao = await updateReuniao.execute({
      id,
      descricao,
      dt_reuniao: parsedDate,
    });

    return response.json(reuniao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

reuniaoRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteReuniao = new DeleteReuniaoService();

    const reuniao = await deleteReuniao.execute({
      id,
    });

    return response.json(reuniao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default reuniaoRouter;
