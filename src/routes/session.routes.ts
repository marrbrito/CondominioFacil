import { Router } from 'express';

// --Receber a requisição, chamar outro arquivo e devolver uma resposta
import UsuarioRepositorio from '../repositories/UsuarioRepositorio';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const usuarioRepositorio = new UsuarioRepositorio();

    const authenticateUserService = new AuthenticateUserService(
      usuarioRepositorio,
    );

    const { usuario, token } = await authenticateUserService.execute({
      email,
      password,
    });

    // delete usuario.password;

    return response.json({ usuario, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
