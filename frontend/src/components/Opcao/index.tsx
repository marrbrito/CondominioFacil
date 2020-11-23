import React, { useState } from 'react';

import { FiEdit3, FiTrash, FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

interface IOpcao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  opcao_id: string;
  descricao: string;
}

interface IProps {
  opcao: IOpcao;
  handleDelete: (opcao_id: string) => {};
  handleEditOpcao: (opcao: IOpcao) => void;
  handleVolta: (condominio: string, reuniao: string) => void;
}

const Opcao: React.FC<IProps> = ({
  opcao,
  handleDelete,
  handleEditOpcao,
  handleVolta,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingOpcao(): void {
    handleEditOpcao(opcao);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{opcao.votacao_id}</strong></h2>
        <p>{opcao.descricao}</p>
        <p>Rossi Caribe</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingOpcao()}
            data-testid={`edit-opcao-${opcao.opcao_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(opcao.opcao_id)}
            data-testid={`remove-opcao-${opcao.opcao_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleVolta(opcao.condominio_id, opcao.reuniao_id)}
            data-testid={`remove-opcao-${opcao.opcao_id}`}
          >
            <FiArrowLeft size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Opcao;
