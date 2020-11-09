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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAviso: (bloco: Omit<IAviso, 'condominio_id' | 'aviso_id'>) => void;
  editingAviso: IAviso;
}

interface IEditAvisoData {
  descricao: string;
  dt_expiracao: Date;
}

const ModalEditAviso: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAviso,
  handleUpdateAviso,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditAvisoData) => {
      handleUpdateAviso(data);
      setIsOpen();
    },
    [handleUpdateAviso, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAviso}>
        <h1>Editar Aviso</h1>
        <InputModal name="descricao" placeholder="Descrição do aviso" />
        <InputModal name="dt_expiracao" placeholder="Data de expiração do aviso" />

        <button type="submit" data-testid="edit-bloco-button">
          <div className="text">Editar Aviso</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAviso;
