import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { MdViewAgenda } from 'react-icons/md';

import { Container } from './styles';

interface IReuniao {
  condominio_id: string;
  reuniao_id: string;
  descricao: string;
  dt_reuniao: Date;
}

interface IProps {
  reuniao: IReuniao;
  handleDelete: (reuniao_id: string) => {};
  handleEditReuniao: (area: IReuniao) => void;
  handleChamaPauta: (condominio: string, reuniao: string) => void;
}

const Reuniao: React.FC<IProps> = ({
  reuniao,
  handleDelete,
  handleEditReuniao,
  handleChamaPauta
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingReuniao(): void {
    handleEditReuniao(reuniao);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{reuniao.descricao}</strong></h2>
        <p>{reuniao.dt_reuniao}</p>
        <p>Condominio Rossi</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingReuniao()}
            data-testid={`edit-reuniao-${reuniao.reuniao_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(reuniao.reuniao_id)}
            data-testid={`remove-reuniao-${reuniao.reuniao_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaPauta(reuniao.condominio_id,reuniao.reuniao_id)}
            data-testid={`remove-reuniao-${reuniao.reuniao_id}`}
          >
            <MdViewAgenda size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Reuniao;
