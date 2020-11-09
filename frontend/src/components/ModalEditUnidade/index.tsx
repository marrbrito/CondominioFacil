import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IUnidade {
  condominio_id: string;
  bloco_id: string;
  unidade_id: string;
  identificador: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateUnidade: (unidade: Omit<IUnidade, 'condominio_id' | 'bloco_id' | 'unidade_id'>) => void;
  editingUnidade: IUnidade;
}

interface IEditUnidadeData {
  identificador: string;
}

const ModalEditUnidade: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingUnidade,
  handleUpdateUnidade,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditUnidadeData) => {
      handleUpdateUnidade(data);
      setIsOpen();
    },
    [handleUpdateUnidade, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingUnidade}>
        <h1>Editar Unidade</h1>
        <InputModal name="identificador" placeholder="Identificador da unidade" />

        <button type="submit" data-testid="edit-unidade-button">
          <div className="text">Editar Unidade</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditUnidade;
