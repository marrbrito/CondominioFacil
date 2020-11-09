/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Condominio from '../models/Condominio';

interface Request {
  id: string;
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

class UpdateCondominioService {
  public async execute({
    id,
    nome,
    cep,
    endereco,
    telefone,
    email,
    sindico,
  }: Request): Promise<Condominio> {
    const condominioRepository = getRepository(Condominio);

    const checkCondominioExists = await condominioRepository.findOne({
      where: { condominio_id: id },
    });

    if (!checkCondominioExists) {
      throw new Error('Condominio não cadastrado.');
    }

    checkCondominioExists.nome = nome;
    checkCondominioExists.cep = cep;
    checkCondominioExists.endereco = endereco;
    checkCondominioExists.telefone = telefone;
    checkCondominioExists.email = email;
    checkCondominioExists.sindico = sindico;

    await condominioRepository.save(checkCondominioExists);

    return checkCondominioExists;
  }
}

export default UpdateCondominioService;
