import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import DashUser from '../pages/DashUser';
import Condomino from '../pages/Condomino';
import Bloco from '../pages/Bloco';
import AreaComum from '../pages/AreaComum';
import Unidade from '../pages/Unidade';
import Aviso from '../pages/Aviso';
import Reuniao from '../pages/Reuniao';
import Pauta from '../pages/Pauta';
import Votacao from '../pages/Votacao';
import Opcao from '../pages/Opcao';
import Autorizacao from '../pages/Autorizacao';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/dashuser" component={DashUser} isPrivate />
    <Route path="/:pessoaautorizada/autorizacao" component={Autorizacao} isPrivate />
    <Route path="/condomino" component={Condomino} isPrivate />
    <Route path="/:condominio/bloco" component={Bloco} isPrivate />
    <Route path="/:condominio/areacomum" component={AreaComum} isPrivate />
    <Route path="/:condominio/aviso" component={Aviso} isPrivate />
    <Route path="/:condominio/reuniao" component={Reuniao} isPrivate />
    <Route path="/:condominio/:bloco/unidade" component={Unidade} isPrivate />
    <Route path="/:condominio/:reuniao/pauta" component={Pauta} isPrivate />
    <Route path="/:condominio/:reuniao/:pauta/votacao" component={Votacao} isPrivate />
    <Route path="/:condominio/:reuniao/:pauta/:votacao/opcao" component={Opcao} isPrivate />
  </Switch>
);

export default Routes;
