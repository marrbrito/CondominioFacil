import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IPauta {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  descricao: string;
  numero: number;
}

interface ICreatePautaData {
  descricao: string;
  numero: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddPauta: (pauta: Omit<IPauta, 'condominio_id' | 'reuniao_id' | 'pauta_id'>) => void;
}

const ModalAddPauta: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPauta,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreatePautaData) => {
      const { descricao, numero } = data;
      handleAddPauta({ descricao, numero });
      setIsOpen();
    },
    [handleAddPauta, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Pauta</h1>
        <InputModal name="numero" placeholder="Ordem da pauta" />
        <InputModal name="descricao" placeholder="Descrição da pauta" />

        <button type="submit" data-testid="add-pauta-button">
          <p className="text">Adicionar Pauta</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddPauta;
