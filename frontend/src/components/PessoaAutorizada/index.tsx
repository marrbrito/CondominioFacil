import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { FaFileSignature } from 'react-icons/fa';

import { Container } from './styles';

interface IPessoaAutorizada {
  pessoa_aut_id: string;
  unidade_id: string;
  condominio_id: string;
  bloco_id: string;
  nome: string;
  num_doc: string;
}

interface IProps {
  pessoaautorizada: IPessoaAutorizada;
  handleDelete: (pessoa_aut_id: string) => {};
  handleEditPessoaAutorizada: (pessoaautorizada: IPessoaAutorizada) => void;
  handleChamaAutorizacao: (pessoaautorizada: string) => void;
}

const PessoaAutorizada: React.FC<IProps> = ({
  pessoaautorizada,
  handleDelete,
  handleEditPessoaAutorizada,
  handleChamaAutorizacao,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingPessoaAutorizada(): void {
    handleEditPessoaAutorizada(pessoaautorizada);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{pessoaautorizada.nome}</strong></h2>
        <p>{pessoaautorizada.num_doc}</p>
        <p>Rossi Caribe</p>
        <p>Torre A</p>
        <p>203</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingPessoaAutorizada()}
            data-testid={`edit-pessoa-${pessoaautorizada.pessoa_aut_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(pessoaautorizada.pessoa_aut_id)}
            data-testid={`remove-pessoa-${pessoaautorizada.pessoa_aut_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaAutorizacao(pessoaautorizada.pessoa_aut_id)}
            data-testid={`chama-autorizacao-${pessoaautorizada.pessoa_aut_id}`}
          >
            <FaFileSignature size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default PessoaAutorizada;
