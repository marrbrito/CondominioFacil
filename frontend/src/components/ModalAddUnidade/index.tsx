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

interface ICreateUnidadeData {
  identificador: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddUnidade: (unidade: Omit<IUnidade, 'condominio_id' | 'bloco_id' | 'unidade_id'>) => void;
}

const ModalAddUnidade: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddUnidade,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateUnidadeData) => {
      const { identificador } = data;
      handleAddUnidade({ identificador });
      setIsOpen();
    },
    [handleAddUnidade, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Unidade</h1>
        <InputModal name="identificador" placeholder="Identificador da unidade" />

        <button type="submit" data-testid="add-unidade-button">
          <p className="text">Adicionar Bloco</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddUnidade;
