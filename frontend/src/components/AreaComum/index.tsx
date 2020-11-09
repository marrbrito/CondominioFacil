import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IAreaComum {
  condominio_id: string;
  area_id: string;
  descricao: string;
  valor_locacao: number;
}

interface IProps {
  area: IAreaComum;
  handleDelete: (area_id: string) => {};
  handleEditAreaComum: (area: IAreaComum) => void;
}

const AreaComum: React.FC<IProps> = ({
  area,
  handleDelete,
  handleEditAreaComum
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingAreaComum(): void {
    handleEditAreaComum(area);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{area.descricao}</strong></h2>
        <p className="valor_locacao">
          R$ <b>{area.valor_locacao}</b>
        </p>
        <p>Condominio Rossi</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingAreaComum()}
            data-testid={`edit-bloco-${area.area_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(area.area_id)}
            data-testid={`remove-bloco-${area.area_id}`}
          >
            <FiTrash size={20} />
          </button>

        </div>
      </section>
    </Container>
  );
};

export default AreaComum;
