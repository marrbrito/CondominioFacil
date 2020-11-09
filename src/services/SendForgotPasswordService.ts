/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */

import { injectable, inject } from 'tsyringe';
import path from 'path';

// import AppError from '../errors/AppError';
import IUsuarioRepositorio from '../repositories/IUsuarioRepositorio';
import IMailProvider from '../container/providers/MailProvider/models/IMailProvider';
import IUsuarioToken from '../repositories/IUsuarioTokenRepositorio';

// import Usuario from '../models/Usuario';
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsuarioRepositorio')
    private usuarioRepositorio: IUsuarioRepositorio,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsuarioTokenRepositorio')
    private usuarioTokenRepositorio: IUsuarioToken,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUsuarioExists = await this.usuarioRepositorio.findByEmail(email);

    if (!checkUsuarioExists) {
      throw new Error('Usuário não existe');
    }

    const { token } = await this.usuarioTokenRepositorio.generate(
      checkUsuarioExists.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        nome: checkUsuarioExists.nome,
        email: checkUsuarioExists.email,
      },
      subject: '[CFácil] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUsuarioExists.nome,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
