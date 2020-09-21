/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAgendamentoService from '../services/CreateAgendamentoService';
import Agendamento from '../models/Agendamento';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const agendamentoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
agendamentoRouter.use(ensureAuthenticated);

agendamentoRouter.get('/', async (request, response) => {
  const agendamentoRepository = getRepository(Agendamento);
  const agendamento = await agendamentoRepository.find();

  return response.json(agendamento);
});

// --Receber a requisição, chamar o service e devolver uma resposta
agendamentoRouter.post('/', async (request, response) => {
  try {
    const {
      condominio_id,
      area_id,
      dt_reserva,
      turno,
      condomino_id,
    } = request.body;

    const parsedDate = parseISO(dt_reserva);

    const createAgendamento = new CreateAgendamentoService();

    const agendamento = await createAgendamento.execute({
      condominio_id,
      area_id,
      data: parsedDate,
      turno,
      condomino_id,
    });

    return response.json(agendamento);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default agendamentoRouter;
