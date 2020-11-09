import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IBloco {
  condominio_id: string;
  bloco_id: string;
  descricao: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateBloco: (bloco: Omit<IBloco, 'condominio_id' | 'bloco_id'>) => void;
  editingBloco: IBloco;
}

interface IEditBlocoData {
  descricao: string;
}

const ModalEditBloco: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingBloco,
  handleUpdateBloco,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditBlocoData) => {
      handleUpdateBloco(data);
      setIsOpen();
    },
    [handleUpdateBloco, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingBloco}>
        <h1>Editar Bloco</h1>
        <InputModal name="descricao" placeholder="Descrição do bloco" />

        <button type="submit" data-testid="edit-bloco-button">
          <div className="text">Editar Bloco</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditBloco;
