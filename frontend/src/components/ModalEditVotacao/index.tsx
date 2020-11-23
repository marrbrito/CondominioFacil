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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateVotacao: (votacao: Omit<IVotacao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id'>) => void;
  editingVotacao: IVotacao;
}

interface IEditVotacaoData {
  dt_inicio: Date;
  dt_fim: Date;
  votos: 0;
}

const ModalEditVotacao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingVotacao,
  handleUpdateVotacao,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditVotacaoData) => {
      handleUpdateVotacao(data);
      setIsOpen();
    },
    [handleUpdateVotacao, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingVotacao}>
        <h1>Editar Unidade</h1>
        <InputModal name="dt_inicio" placeholder="Data de inicio da votação" />
        <InputModal name="dt_fim" placeholder="Data de fim da votação" />

        <button type="submit" data-testid="edit-votacao-button">
          <div className="text">Editar Votação</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditVotacao;
