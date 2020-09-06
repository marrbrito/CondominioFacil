/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';
import Condominio from '../models/Condominio';

interface Request {
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

class CreateCondominioService {
  public async execute({
    nome,
    cep,
    endereco,
    telefone,
    email,
    sindico,
  }: Request): Promise<Condominio> {
    const condominioRepository = getRepository(Condominio);

    const checkCondominioExists = await condominioRepository.findOne({
      where: { nome },
    });

    if (checkCondominioExists) {
      throw new Error('Condominio já cadastrado.');
    }

    const checkEnderecoExists = await condominioRepository.findOne({
      where: { endereco },
    });

    if (checkEnderecoExists) {
      throw new Error('Existe um condominio cadastrado neste endereço.');
    }

    const condominio = condominioRepository.create({
      nome,
      cep,
      endereco,
      telefone,
      email,
      sindico,
    });

    await condominioRepository.save(condominio);

    return condominio;
  }
}

export default CreateCondominioService;
