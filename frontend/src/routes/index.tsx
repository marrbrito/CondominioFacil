import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Bloco from '../pages/Bloco';
import AreaComum from '../pages/AreaComum';
import Unidade from '../pages/Unidade';
import Aviso from '../pages/Aviso';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/:condominio/bloco" component={Bloco} isPrivate />
    <Route path="/:condominio/areacomum" component={AreaComum} isPrivate />
    <Route path="/:condominio/aviso" component={Aviso} isPrivate />
    <Route path="/:condominio/:bloco/unidade" component={Unidade} isPrivate />
  </Switch>
);

export default Routes;
