/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';
import 'express-async-error';

// import AppError from './errors/AppError';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server: Condominio Facil started on port 3333');
});
