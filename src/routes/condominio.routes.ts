/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCondominioService from '../services/CreateCondominioService';
import Condominio from '../models/Condominio';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const condominioRouter = Router();

// --Para realizar operacoes tem que estar autenticado!
condominioRouter.use(ensureAuthenticated);

condominioRouter.get('/', async (request, response) => {
  const condominioRepository = getRepository(Condominio);
  const condominio = await condominioRepository.find();

  return response.json(condominio);
});

// --Receber a requisição, chamar outro arquivo e devolver uma resposta
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

export default condominioRouter;
