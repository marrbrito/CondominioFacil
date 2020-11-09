/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { container } from 'tsyringe';

import './providers';

import IUsuarioRepositorio from '../repositories/IUsuarioRepositorio';
import UsuarioRepositorio from '../repositories/UsuarioRepositorio';

import IUsuarioTokenRepositorio from '../repositories/IUsuarioTokenRepositorio';
import UsuarioTokenRepositorio from '../repositories/UsuarioTokenRepositorio';

container.registerSingleton<IUsuarioRepositorio>(
  'UsuarioRepositorio',
  UsuarioRepositorio,
);

container.registerSingleton<IUsuarioTokenRepositorio>(
  'UsuarioTokenRepositorio',
  UsuarioTokenRepositorio,
);
