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
import pessoaautorizadaRouter from './pessoa_autorizada.routes';
import autorizacaoRouter from './autorizacao.routes';
import reuniaoRouter from './reuniao.routes';
import pautaRouter from './pauta.routes';
import votacaoRouter from './votacao.routes';
import opcaoRouter from './opcao.routes';
import votoRouter from './voto.routes';

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
routes.use('/pessoaautorizada', pessoaautorizadaRouter);
routes.use('/autorizacao', autorizacaoRouter);
routes.use('/reuniao', reuniaoRouter);
routes.use('/pauta', pautaRouter);
routes.use('/votacao', votacaoRouter);
routes.use('/opcao', opcaoRouter);
routes.use('/voto', votoRouter);

export default routes;
