import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IVotacao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  dt_inicio: Date;
  dt_fim: Date;
  votos: number;
}

interface ICreateVotacaoData {
  dt_inicio: Date;
  dt_fim: Date;
  votos: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddVotacao: (votacao: Omit<IVotacao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id'>) => void;
}

const ModalAddVotacao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddVotacao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateVotacaoData) => {
      const { dt_inicio, dt_fim, votos } = data;
      handleAddVotacao({ dt_inicio, dt_fim, votos });
      setIsOpen();
    },
    [handleAddVotacao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Votação</h1>
        <InputModal name="dt_inicio" placeholder="Data de inicio da votação" />
        <InputModal name="dt_fim" placeholder="Data de fim da votação" />

        <button type="submit" data-testid="add-votacao-button">
          <p className="text">Adicionar Votação</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddVotacao;
