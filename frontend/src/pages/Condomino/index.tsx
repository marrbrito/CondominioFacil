import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiMail, FiUser, FiCalendar, FiUserX, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import logoUsr from '../../assets/usuario_cond.png';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, FiguraInput } from './styles';
import { useAuth } from '../../context/AuthContext';

interface CondominoFormData {
  nome: string;
  email: string;
  cpf: string;
  dt_nascimento: Date;
  sexo: string;
  celular: string;
  usuario_id: string;
}

const Condomino: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { usuario } = useAuth();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: CondominoFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string()
            .required('Nome obrigatório')
            .min(3, 'Mínimo 3 caracteres'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .min(11, 'Cpf deve ter 11 caracteres'),
          dt_nascimento: Yup.date(),
          sexo: Yup.mixed()
            .oneOf(['Masculino', 'Feminino','']),
            celular: Yup.string()
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.usuario_id = usuario.id;

        // ---Os usuarios cadastrados sao condominos
        // eslint-disable-next-line no-param-reassign
        await api.post('/condomino', data);

        history.push('/dashuser');

        addToast({
          type: 'success',
          title: 'Condomino atualizado!',
          description: 'Dados do condomino atualizados com sucesso!',
        });
      } catch (err) {
        // ---Se o erro foi originado da validacao do formulario
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        // ---Disparar um toast
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao tentar atualizar os dados do condomino!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
         <Link to="/dashuser">
          <FiArrowLeft />
         </Link>
        </div>
      </header>

      <Content>

          <Form ref={formRef} initialData={{
            nome: usuario.nome,
            email: usuario.email,
          }} onSubmit={handleSubmit}>
            <FiguraInput>
            <img src={logoUsr} alt={usuario.nome}/>
            </FiguraInput>

            <h1>Perfil de Condomino</h1>

            <Input name="nome" icon={FiUser} placeholder="Nome"/>
            <Input name="email" icon={FiMail} placeholder="E-mail"/>
            <Input name="cpf" icon={AiOutlineFieldNumber} placeholder="Cpf" />
            <Input name="dt_nascimento" icon={FiCalendar} placeholder="Data de Nascimento" />
            <Input name="sexo" icon={FiUserX} placeholder="Sexo" />
            <Input name="celular" icon={FiPhone} placeholder="Celular" />

            <Button type="submit">Confirmar</Button>
          </Form>

      </Content>
    </Container>
  );
};

export default Condomino;
