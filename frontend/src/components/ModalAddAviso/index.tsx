import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IAviso {
  condominio_id: string;
  aviso_id: string;
  descricao: string;
  dt_expiracao: Date;
}

interface ICreateAvisoData {
  descricao: string;
  dt_expiracao: Date;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAviso: (aviso: Omit<IAviso, 'condominio_id' | 'aviso_id'>) => void;
}

const ModalAddAviso: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAviso,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateAvisoData) => {
      const { descricao, dt_expiracao } = data;
      handleAddAviso({ descricao, dt_expiracao });
      setIsOpen();
    },
    [handleAddAviso, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Aviso</h1>
        <InputModal name="descricao" placeholder="Descrição do aviso" />
        <InputModal name="dt_expiracao" placeholder="Data de expiração do aviso" />

        <button type="submit" data-testid="add-aviso-button">
          <p className="text">Adicionar Aviso</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddAviso;
