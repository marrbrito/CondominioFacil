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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdatePauta: (pauta: Omit<IPauta, 'condominio_id' | 'reuniao_id' | 'pauta_id'>) => void;
  editingPauta: IPauta;
}

interface IEditPautaData {
  descricao: string;
  numero: number;
}

const ModalEditPauta: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingPauta,
  handleUpdatePauta,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditPautaData) => {
      handleUpdatePauta(data);
      setIsOpen();
    },
    [handleUpdatePauta, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingPauta}>
        <h1>Editar Unidade</h1>
        <InputModal name="numero" placeholder="Ordem da pauta" />
        <InputModal name="descricao" placeholder="Descrição da pauta" />

        <button type="submit" data-testid="edit-pauta-button">
          <div className="text">Editar Unidade</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditPauta;
