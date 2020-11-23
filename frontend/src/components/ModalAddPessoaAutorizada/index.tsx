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


interface ICreatePessoaData {
  nome: string;
  num_doc: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddPessoaAutorizada: (pessoaautorizada: Omit<IPessoaAutorizada, 'condominio_id' | 'bloco_id' | 'unidade_id' | 'pessoa_aut_id'>) => void;
}

const ModalAddPessoaAutorizada: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPessoaAutorizada,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreatePessoaData) => {
      const { nome, num_doc } = data;
      handleAddPessoaAutorizada({ nome, num_doc });
      setIsOpen();
    },
    [handleAddPessoaAutorizada, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Pessoa Autorizada</h1>
        <InputModal name="nome" placeholder="Nome da pessoa autorizada" />
        <InputModal name="num_doc" placeholder="Nro do documento da pessoa autorizada" />

        <button type="submit" data-testid="add-pessoa-button">
          <p className="text">Adicionar Pessoa Autorizada</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddPessoaAutorizada;
