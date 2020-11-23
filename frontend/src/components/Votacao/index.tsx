import React, { useState } from 'react';

import { FiEdit3, FiTrash, FiArrowLeft } from 'react-icons/fi';

import { IoMdOptions } from 'react-icons/io';

import { Container } from './styles';

interface IVotacao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  dt_inicio: Date;
  dt_fim: Date;
  votos: number;
}

interface IProps {
  votacao: IVotacao;
  handleDelete: (votacao_id: string) => {};
  handleEditVotacao: (votacao: IVotacao) => void;
  handleVolta: (condominio: string, reuniao: string) => void;
  handleChamaOpcao: (condominio: string, reuniao: string, pauta: string, votacao: string) => void;
}

const Votacao: React.FC<IProps> = ({
  votacao,
  handleDelete,
  handleEditVotacao,
  handleVolta,
  handleChamaOpcao,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingVotacao(): void {
    handleEditVotacao(votacao);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{votacao.pauta_id}</strong></h2>
        <p>{votacao.dt_inicio}</p>
        <p>{votacao.dt_fim}</p>
        <p>{votacao.votos}</p>
        <p>Rossi Caribe</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingVotacao()}
            data-testid={`edit-pauta-${votacao.votacao_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(votacao.votacao_id)}
            data-testid={`remove-votacao-${votacao.votacao_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleVolta(votacao.condominio_id, votacao.reuniao_id)}
            data-testid={`remove-votacao-${votacao.votacao_id}`}
          >
            <FiArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaOpcao(votacao.condominio_id, votacao.reuniao_id, votacao.pauta_id, votacao.votacao_id)}
            data-testid={`remove-votacao-${votacao.votacao_id}`}
          >
            <IoMdOptions size={20} />
          </button>


        </div>
      </section>
    </Container>
  );
};

export default Votacao;
