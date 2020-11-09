import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IAviso {
  condominio_id: string;
  aviso_id: string;
  descricao: string;
  dt_expiracao: Date;
}

interface IProps {
  aviso: IAviso;
  handleDelete: (aviso_id: string) => {};
  handleEditAviso: (aviso: IAviso) => void;
}

const Aviso: React.FC<IProps> = ({
  aviso,
  handleDelete,
  handleEditAviso,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingAviso(): void {
    handleEditAviso(aviso);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h3><strong>{aviso.descricao}</strong></h3>
        <p>{aviso.dt_expiracao}</p>
        <p>Condominio Rossi</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingAviso()}
            data-testid={`edit-aviso-${aviso.aviso_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(aviso.aviso_id)}
            data-testid={`remove-aviso-${aviso.aviso_id}`}
          >
            <FiTrash size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Aviso;
