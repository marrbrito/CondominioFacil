/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePessoaAutorizadaService from '../services/CreatePessoaAutorizadaService';
import UpdatePessoaAutorizadaService from '../services/UpdatePessoaAutorizadaService';
import DeletePessoaAutorizadaService from '../services/DeletePessoaAutorizadaService';

import Pessoa_Autorizada from '../models/Pessoa_Autorizada';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pessoaautorizadaRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// pessoaautorizadaRouter.use(ensureAuthenticated);

pessoaautorizadaRouter.get('/', async (request, response) => {
  const pessoaAutorizadaRepository = getRepository(Pessoa_Autorizada);
  let pessoaautorizada: Pessoa_Autorizada[];

  if (request.query.condominio_id && request.query.unidade_id) {
    pessoaautorizada = await pessoaAutorizadaRepository.find({
      where: {
        condominio_id: request.query.condominio_id,
        bloco_id: request.query.bloco_id,
        unidade_id: request.query.unidade_id,
      },
    });
  } else {
    pessoaautorizada = await pessoaAutorizadaRepository.find();
  }

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

pessoaautorizadaRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { nome, num_doc } = request.body;

    const updatePessoaAutorizada = new UpdatePessoaAutorizadaService();

    const pessoa = await updatePessoaAutorizada.execute({
      id,
      nome,
      num_doc
    });

    return response.json(pessoa);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

pessoaautorizadaRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletePessoaAutorizada = new DeletePessoaAutorizadaService();

    const bloco = await deletePessoaAutorizada.execute({
      id,
    });

    return response.json(bloco);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pessoaautorizadaRouter;
