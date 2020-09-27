/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePessoaAutorizadaService from '../services/CreatePessoaAutorizadaService';
import Pessoa_Autorizada from '../models/Pessoa_Autorizada';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pessoaautorizadaRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
pessoaautorizadaRouter.use(ensureAuthenticated);

pessoaautorizadaRouter.get('/', async (request, response) => {
  const pessoaautorizadaRepository = getRepository(Pessoa_Autorizada);
  const pessoaautorizada = await pessoaautorizadaRepository.find();

  return response.json(pessoaautorizada);
});

// --Receber a requisição, chamar o service e devolver uma resposta
pessoaautorizadaRouter.post('/', async (request, response) => {
  try {
    const { unidade_id, condominio_id, bloco_id, nome, num_doc } = request.body;

    const createPessoaAutorizada = new CreatePessoaAutorizadaService();

    const pessoaautorizada = await createPessoaAutorizada.execute({
      unidade_id,
      condominio_id,
      bloco_id,
      nome,
      num_doc,
    });

    return response.json(pessoaautorizada);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pessoaautorizadaRouter;
