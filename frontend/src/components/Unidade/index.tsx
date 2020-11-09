import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IUnidade {
  condominio_id: string;
  bloco_id: string;
  unidade_id: string;
  identificador: string;
}

interface IProps {
  unidade: IUnidade;
  handleDelete: (unidade_id: string) => {};
  handleEditUnidade: (unidade: IUnidade) => void;
}

const Unidade: React.FC<IProps> = ({
  unidade,
  handleDelete,
  handleEditUnidade,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingUnidade(): void {
    handleEditUnidade(unidade);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{unidade.identificador}</strong></h2>
        <p>Rossi Caribe</p>
        <p>Torre A</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingUnidade()}
            data-testid={`edit-unidade-${unidade.unidade_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(unidade.unidade_id)}
            data-testid={`remove-unidade-${unidade.unidade_id}`}
          >
            <FiTrash size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Unidade;
