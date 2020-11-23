import React, { useState } from 'react';

import { FiEdit3, FiTrash, FiArrowLeft } from 'react-icons/fi';

import { GiVote } from 'react-icons/gi';

import { Container } from './styles';

interface IPauta {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  descricao: string;
  numero: number;
}

interface IProps {
  pauta: IPauta;
  handleDelete: (pauta_id: string) => {};
  handleEditPauta: (pauta: IPauta) => void;
  handleVolta: (condominio: string) => void;
  handleChamaVotacao: (condominio: string, reuniao: string, pauta: string) => void;
}

const Pauta: React.FC<IProps> = ({
  pauta,
  handleDelete,
  handleEditPauta,
  handleVolta,
  handleChamaVotacao,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingPauta(): void {
    handleEditPauta(pauta);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{pauta.numero}</strong></h2>
        <p>{pauta.descricao}</p>
        <p>Rossi Caribe</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingPauta()}
            data-testid={`edit-pauta-${pauta.pauta_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(pauta.pauta_id)}
            data-testid={`remove-pauta-${pauta.pauta_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleVolta(pauta.condominio_id)}
            data-testid={`remove-unidade-${pauta.pauta_id}`}
          >
            <FiArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaVotacao(pauta.condominio_id, pauta.reuniao_id, pauta.pauta_id)}
            data-testid={`remove-votacao-${pauta.pauta_id}`}
          >
            <GiVote size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Pauta;
