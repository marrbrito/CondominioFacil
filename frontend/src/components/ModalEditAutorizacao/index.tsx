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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAutorizacao: (autorizacao: Omit<IAutorizacao, 'pessoa_aut_id' | 'autorizacao_id'>) => void;
  editingAutorizacao: IAutorizacao;
}

interface IEditAutorizacaoData {
  tipo_acesso: string;
  dt_fim: Date;
}

const ModalEditAutorizacao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAutorizacao,
  handleUpdateAutorizacao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditAutorizacaoData) => {
      handleUpdateAutorizacao(data);
      setIsOpen();
    },
    [handleUpdateAutorizacao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAutorizacao}>
        <h1>Editar Autorização</h1>
        <InputModal name="tipo_acesso" placeholder="Tipo de acesso da autorização" />
        <InputModal name="dt_fim" placeholder="Data de fim da autorização" />

        <button type="submit" data-testid="edit-autorizacao-button">
          <div className="text">Editar Autorização</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAutorizacao;
