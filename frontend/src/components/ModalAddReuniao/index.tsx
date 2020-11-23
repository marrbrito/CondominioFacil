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

interface ICreateReuniaoData {
  descricao: string;
  dt_reuniao: Date;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddReuniao: (area: Omit<IReuniao, 'condominio_id' | 'reuniao_id'>) => void;
}

const ModalAddReuniao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddReuniao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateReuniaoData) => {
      const { descricao, dt_reuniao } = data;
      handleAddReuniao({ descricao, dt_reuniao });
      setIsOpen();
    },
    [handleAddReuniao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Reunião</h1>
        <InputModal name="descricao" placeholder="Descrição da reunião" />
        <InputModal name="dt_reuniao" placeholder="Data da reunião" />

        <button type="submit" data-testid="add-reuniao-button">
          <p className="text">Adicionar Reunião</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddReuniao;
