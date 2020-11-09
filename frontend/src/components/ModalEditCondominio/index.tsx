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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateCondominio: (condominio: Omit<ICondominio, 'condominio_id'>) => void;
  editingCondominio: ICondominio;
}

interface IEditCondominioData {
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

const ModalEditCondominio: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingCondominio,
  handleUpdateCondominio,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditCondominioData) => {
      handleUpdateCondominio(data);
      setIsOpen();
    },
    [handleUpdateCondominio, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCondominio}>
        <h1>Editar Condominio</h1>
        <InputModal name="nome" placeholder="Nome do condominio" />
        <InputModal name="cep" placeholder="Cep do condominio" />
        <InputModal name="endereco" placeholder="Endereço do condominio" />
        <InputModal name="telefone" placeholder="Telefone do condominio" />
        <InputModal name="email" placeholder="Email do Condominio" />
        <InputModal name="sindico" placeholder="Sindico do Condominio" />

        <button type="submit" data-testid="edit-cond-button">
          <div className="text">Editar Condominio</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditCondominio;
