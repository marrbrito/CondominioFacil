import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IAutorizacao {
  pessoa_aut_id: string;
  autorizacao_id: string;
  tipo_acesso: string;
  dt_fim: Date;
}

interface IProps {
  autorizacao: IAutorizacao;
  handleDelete: (autorizacao: string) => {};
  handleEditAutorizacao: (autorizacao: IAutorizacao) => void;
}

const Autorizacao: React.FC<IProps> = ({
  autorizacao,
  handleDelete,
  handleEditAutorizacao,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingAutorizacao(): void {
    handleEditAutorizacao(autorizacao);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{autorizacao.tipo_acesso}</strong></h2>
        <p>{autorizacao.dt_fim}</p>
        <p>Rossi Caribe</p>
        <p>Torre A</p>
        <p>203</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingAutorizacao()}
            data-testid={`edit-autorizacao-${autorizacao.autorizacao_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(autorizacao.autorizacao_id)}
            data-testid={`remove-autorizacao-${autorizacao.autorizacao_id}`}
          >
            <FiTrash size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Autorizacao;
