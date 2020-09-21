// src/routes/index.ts
import { Router } from 'express';

import usersRouter from './usuario.routes';
import sessionsRouter from './session.routes';
import condominioRouter from './condominio.routes';
import condominoRouter from './condomino.routes';
import blocoRouter from './bloco.routes';
import unidadeparticularRouter from './unidade_particular.routes';
import areacomumRouter from './area_comum.routes';
import avisoRouter from './aviso.routes';
import agendamentoRouter from './agendamento.routes';

const routes = Router();

routes.use('/usuario', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/condominio', condominioRouter);
routes.use('/condomino', condominoRouter);
routes.use('/bloco', blocoRouter);
routes.use('/unidade', unidadeparticularRouter);
routes.use('/areacomum', areacomumRouter);
routes.use('/aviso', avisoRouter);
routes.use('/agendamento', agendamentoRouter);

export default routes;
