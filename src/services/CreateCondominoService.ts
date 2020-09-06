/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';
import Condomino from '../models/Condomino';

interface Request {
  cpf: string;
  nome: string;
  dt_nascimento: Date;
  sexo: string;
  celular: string;
  email: string;
}

class CreateCondominoService {
  public async execute({
    cpf,
    nome,
    dt_nascimento,
    sexo,
    celular,
    email,
  }: Request): Promise<Condomino> {
    const condominoRepository = getRepository(Condomino);

    const checkCondominoExists = await condominoRepository.findOne({
      where: { cpf },
    });

    if (checkCondominoExists) {
      throw new Error('CPF já cadastrado.');
    }

    const condomino = condominoRepository.create({
      cpf,
      nome,
      dt_nascimento,
      sexo,
      celular,
      email,
    });

    await condominoRepository.save(condomino);

    return condomino;
  }
}

export default CreateCondominoService;
