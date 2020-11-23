import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import InputModal from '../InputModal';

interface IPessoaAutorizada {
  pessoa_aut_id: string;
  unidade_id: string;
  condominio_id: string;
  bloco_id: string;
  nome: string;
  num_doc: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdatePessoaAutorizada: (pessoaautorizada: Omit<IPessoaAutorizada, 'condominio_id' | 'bloco_id' | 'unidade_id' | 'pessoa_aut_id'>) => void;
  editingPessoaAutorizada: IPessoaAutorizada;
}

interface IEditPessoaData {
  nome: string;
  num_doc: string;
}

const ModalEditPessoaAutorizada: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingPessoaAutorizada,
  handleUpdatePessoaAutorizada,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditPessoaData) => {
      handleUpdatePessoaAutorizada(data);
      setIsOpen();
    },
    [handleUpdatePessoaAutorizada, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingPessoaAutorizada}>
        <h1>Editar Pessoa Autorizada</h1>
        <InputModal name="nome" placeholder="Nome da pessoa autorizada" />
        <InputModal name="num_doc" placeholder="Nro do documento da pessoa autorizada" />

        <button type="submit" data-testid="edit-pessoa-button">
          <div className="text">Editar Pessoa Autorizada</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditPessoaAutorizada;
