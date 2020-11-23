import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IReuniao {
  condominio_id: string;
  reuniao_id: string;
  descricao: string;
  dt_reuniao: Date;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateReuniao: (bloco: Omit<IReuniao, 'condominio_id' | 'reuniao_id'>) => void;
  editingReuniao: IReuniao;
}

interface IEditReuniaoData {
  descricao: string;
  dt_reuniao: Date;
}

const ModalEditReuniao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingReuniao,
  handleUpdateReuniao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditReuniaoData) => {
      handleUpdateReuniao(data);
      setIsOpen();
    },
    [handleUpdateReuniao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingReuniao}>
        <h1>Editar Reunião</h1>
        <InputModal name="descricao" placeholder="Descrição da reunião" />
        <InputModal name="dt_reuniao" placeholder="Data da reunião" />
        <button type="submit" data-testid="edit-reuniao-button">
          <div className="text">Editar Reunião</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditReuniao;
