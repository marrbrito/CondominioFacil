import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayLoad {
  int: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token de autenticação está faltando.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    // -- Id do usuario da sessao disponivel em tods as rotas!
    request.user = {
      id: sub,
    };

    // -- Se deu tudo certo segue pode atender a requisição
    return next();
  } catch (err) {
    throw new Error('Token de autenticação inválido');
  }
}
