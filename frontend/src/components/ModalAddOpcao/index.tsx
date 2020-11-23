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

interface ICreateOpcaoData {
  descricao: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddOpcao: (opcao: Omit<IOpcao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id' | 'opcao_id'>) => void;
}

const ModalAddOpcao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddOpcao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateOpcaoData) => {
      const { descricao } = data;
      handleAddOpcao({ descricao });
      setIsOpen();
    },
    [handleAddOpcao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Opção</h1>
        <InputModal name="descricao" placeholder="Descrição da opção da votação" />

        <button type="submit" data-testid="add-votacao-button">
          <p className="text">Adicionar Opção</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddOpcao;
