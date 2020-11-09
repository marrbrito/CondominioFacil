import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface ICondominio {
  condominio_id: string;
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

interface ICreateCondominioData {
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddCondominio: (condominio: Omit<ICondominio, 'condominio_id'>) => void;
}

const ModalAddCondominio: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddCondominio,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateCondominioData) => {
      const { nome, cep, endereco, telefone, email, sindico } = data;
      handleAddCondominio({ nome, cep, endereco, telefone, email, sindico });
      setIsOpen();
    },
    [handleAddCondominio, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Condominio</h1>
        <InputModal name="nome" placeholder="Nome do condominio" />
        <InputModal name="cep" placeholder="Cep do condominio" />
        <InputModal name="endereco" placeholder="Endereço do condominio" />
        <InputModal name="telefone" placeholder="Telefone do condominio" />
        <InputModal name="email" placeholder="Email do Condominio" />
        <InputModal name="sindico" placeholder="Sindico do Condominio" />

        <button type="submit" data-testid="add-cond-button">
          <p className="text">Adicionar Condominio</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddCondominio;
