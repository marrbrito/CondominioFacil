import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IOpcao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  opcao_id: string;
  descricao: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateOpcao: (opcao: Omit<IOpcao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id' | 'opcao_id'>) => void;
  editingOpcao: IOpcao;
}

interface IEditOpcaoData {
  descricao: string;
}

const ModalEditOpcao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingOpcao,
  handleUpdateOpcao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditOpcaoData) => {
      handleUpdateOpcao(data);
      setIsOpen();
    },
    [handleUpdateOpcao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingOpcao}>
        <h1>Editar Opção</h1>
        <InputModal name="descricao" placeholder="Descrição da opção da votação" />

        <button type="submit" data-testid="edit-opcao-button">
          <div className="text">Editar Opção</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditOpcao;
