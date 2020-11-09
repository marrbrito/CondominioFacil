import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IAreaComum {
  condominio_id: string;
  area_id: string;
  descricao: string;
  valor_locacao: number;
}

interface ICreateAreaComumData {
  descricao: string;
  valor_locacao: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAreaComum: (area: Omit<IAreaComum, 'condominio_id' | 'area_id'>) => void;
}

const ModalAddAreaComum: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAreaComum,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateAreaComumData) => {
      const { descricao, valor_locacao } = data;
      handleAddAreaComum({ descricao, valor_locacao });
      setIsOpen();
    },
    [handleAddAreaComum, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Área Comum</h1>
        <InputModal name="descricao" placeholder="Descrição da área comum" />
        <InputModal name="valor_locacao" placeholder="Valor locação da área comum" />

        <button type="submit" data-testid="add-area-button">
          <p className="text">Adicionar Área Comum</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddAreaComum;
