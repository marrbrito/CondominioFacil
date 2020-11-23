import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IAutorizacao {
  pessoa_aut_id: string;
  autorizacao_id: string;
  tipo_acesso: string;
  dt_fim: Date;
}

interface ICreateAutorizacaoData {
  tipo_acesso: string;
  dt_fim: Date;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAutorizacao: (autorizacao: Omit<IAutorizacao, 'pessoa_aut_id' | 'autorizacao_id'>) => void;
}

const ModalAddAutorizacao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAutorizacao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateAutorizacaoData) => {
      const { tipo_acesso, dt_fim } = data;
      handleAddAutorizacao({ tipo_acesso, dt_fim });
      setIsOpen();
    },
    [handleAddAutorizacao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Autorização</h1>
        <InputModal name="tipo_acesso" placeholder="Tipo de acesso da pessoa autorizada" />
        <InputModal name="dt_fim" placeholder="Data de fim da autorização" />

        <button type="submit" data-testid="add-autorizacao-button">
          <p className="text">Adicionar Autorização</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddAutorizacao;
