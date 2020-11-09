import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IBloco {
  condominio_id: string;
  bloco_id: string;
  descricao: string;
}

interface IProps {
  bloco: IBloco;
  handleDelete: (bloco_id: string) => {};
  handleEditBloco: (bloco: IBloco) => void;
  handleChamaUnidade: (condominio: string, bloco: string) => void;
}

const Bloco: React.FC<IProps> = ({
  bloco,
  handleDelete,
  handleEditBloco,
  handleChamaUnidade,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingBloco(): void {
    handleEditBloco(bloco);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{bloco.descricao}</strong></h2>
        <p>Rossi Caribe</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingBloco()}
            data-testid={`edit-bloco-${bloco.bloco_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(bloco.bloco_id)}
            data-testid={`remove-bloco-${bloco.bloco_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="chama"
            onClick={() => handleChamaUnidade(bloco.condominio_id,bloco.bloco_id)}
            data-testid={`chama-unidade-${bloco.bloco_id}`}
          >
            Unidades
          </button>

        </div>
      </section>
    </Container>
  );
};

export default Bloco;
