/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateVotacaoService from '../services/CreateVotacaoService';
import UpdateVotacaoService from '../services/UpdateVotacaoService';
import DeleteVotacaoService from '../services/DeleteVotacaoService';

import Votacao from '../models/Votacao';
// mport ensureAuthenticated from '../middlewares/ensureAuthenticated';

const votacaoRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// votacaoRouter.use(ensureAuthenticated);

votacaoRouter.get('/', async (request, response) => {
  const votacaoRepository = getRepository(Votacao);

  let votacao: Votacao[];

  if (request.query.pauta_id) {
    votacao = await votacaoRepository.find({
      where: {
        pauta_id: request.query.pauta_id,
      },
    });

    /* const votacao = await votacaoRepository
    .createQueryBuilder('votacao')
    .leftJoinAndSelect(Pauta, 'pauta', 'pauta.pauta_id = votacao.pauta_id')
    .where('pauta.pauta_id = :pauta', { pauta: request.query.pauta_id })
    .select(['pauta.descricao', 'votacao.dt_inicio'])
    .execute(); */
  } else {
    votacao = await votacaoRepository.find();
  }

  return response.json(votacao);
});

// --Receber a requisição, chamar o service e devolver uma resposta
votacaoRouter.post('/', async (request, response) => {
  try {
    const { pauta_id, dt_inicio, dt_fim } = request.body;

    const createVotacao = new CreateVotacaoService();

    const pauta = await createVotacao.execute({
      pauta_id,
      dt_inicio,
      dt_fim,
    });

    return response.json(pauta);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

votacaoRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { dt_inicio, dt_fim } = request.body;

    const parsedDateI = parseISO(dt_inicio);
    const parsedDateF = parseISO(dt_fim);

    const updateVotacao = new UpdateVotacaoService();

    const votacao = await updateVotacao.execute({
      id,
      dt_inicio: parsedDateI,
      dt_fim: parsedDateF,
    });

    return response.json(votacao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

votacaoRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteReuniao = new DeleteVotacaoService();

    const reuniao = await deleteReuniao.execute({
      id,
    });

    return response.json(reuniao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default votacaoRouter;
