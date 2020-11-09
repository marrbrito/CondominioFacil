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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAreaComum: (bloco: Omit<IAreaComum, 'condominio_id' | 'area_id'>) => void;
  editingAreaComum: IAreaComum;
}

interface IEditAreaComumData {
  descricao: string;
  valor_locacao: number;
}

const ModalEditAreaComum: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAreaComum,
  handleUpdateAreaComum,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditAreaComumData) => {
      handleUpdateAreaComum(data);
      setIsOpen();
    },
    [handleUpdateAreaComum, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAreaComum}>
        <h1>Editar Área Comum</h1>
        <InputModal name="descricao" placeholder="Descrição da área comum" />
        <InputModal name="valor_locacao" placeholder="Valor locação da área comum" />
        <button type="submit" data-testid="edit-bloco-button">
          <div className="text">Editar Área Comum</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAreaComum;
