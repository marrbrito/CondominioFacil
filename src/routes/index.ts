// src/routes/index.ts
import { Router } from 'express';

import usersRouter from './usuario.routes';
import sessionsRouter from './session.routes';
import condominioRouter from './condominio.routes';
import condominoRouter from './condomino.routes';

const routes = Router();

routes.use('/usuario', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/condominio', condominioRouter);
routes.use('/condomino', condominoRouter);

export default routes;
