/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCondominioService from '../services/CreateCondominioService';
import UpdateCondominioService from '../services/UpdateCondominioService';
import DeleteCondominioService from '../services/DeleteCondominioService';
import Condominio from '../models/Condominio';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const condominioRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
// condominioRouter.use(ensureAuthenticated);

condominioRouter.get('/', async (request, response) => {
  const condominioRepository = getRepository(Condominio);
  const condominio = await condominioRepository.find();

  return response.json(condominio);
});

// --Receber a requisição, chamar o service e devolver uma resposta
condominioRouter.post('/', async (request, response) => {
  try {
    const { nome, cep, endereco, telefone, email, sindico } = request.body;

    const createCondominio = new CreateCondominioService();

    const condominio = await createCondominio.execute({
      nome,
      cep,
      endereco,
      telefone,
      email,
      sindico,
    });

    return response.json(condominio);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

condominioRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { nome, cep, endereco, telefone, email, sindico } = request.body;

    const updateCondominio = new UpdateCondominioService();

    const condominio = await updateCondominio.execute({
      id,
      nome,
      cep,
      endereco,
      telefone,
      email,
      sindico,
    });

    return response.json(condominio);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

condominioRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteCondominio = new DeleteCondominioService();

    const condominio = await deleteCondominio.execute({
      id,
    });

    return response.json(condominio);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default condominioRouter;
