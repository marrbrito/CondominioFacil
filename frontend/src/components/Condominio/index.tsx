import React, { useState } from 'react';

import { FiEdit3, FiTrash, FiLayers } from 'react-icons/fi';

import { ImWarning } from 'react-icons/im';

import { GiFireplace } from 'react-icons/gi';

import { SiGooglehangoutsmeet } from 'react-icons/si';

import { Container } from './styles';

interface ICondominio {
  condominio_id: string;
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

interface IProps {
  condominio: ICondominio;
  handleDelete: (condominio_id: string) => {};
  handleEditCondominio: (condominio: ICondominio) => void;
  handleChamaBloco: (condominio: string) => void;
  handleChamaAreaComum: (condominio: string) => void;
  handleChamaAviso: (condominio: string) => void;
  handleChamaReuniao: (condominio: string) => void;
}

const Condominio: React.FC<IProps> = ({
  condominio,
  handleDelete,
  handleEditCondominio,
  handleChamaBloco,
  handleChamaAreaComum,
  handleChamaAviso,
  handleChamaReuniao,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  function setEditingCondominio(): void {
    handleEditCondominio(condominio);
  }

  return (
    <Container available={isAvailable}>
      <section className="body">
        <h2><strong>{condominio.nome}</strong></h2>
        <p>{condominio.cep}</p>
        <p>{condominio.endereco}</p>
        <p>{condominio.telefone}</p>
        <p>{condominio.email}</p>
        <p>{condominio.sindico}</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingCondominio()}
            data-testid={`edit-cond-${condominio.condominio_id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(condominio.condominio_id)}
            data-testid={`remove-cond-${condominio.condominio_id}`}
          >
            <FiTrash size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaBloco(condominio.condominio_id)}
            data-testid={`chama-bloco-${condominio.condominio_id}`}
          >
            <FiLayers size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaAreaComum(condominio.condominio_id)}
            data-testid={`chama-area-${condominio.condominio_id}`}
          >
            <GiFireplace size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaAviso(condominio.condominio_id)}
            data-testid={`chama-aviso-${condominio.condominio_id}`}
          >
            <ImWarning size={20} />
          </button>

          <button
            type="button"
            className="icon2"
            onClick={() => handleChamaReuniao(condominio.condominio_id)}
            data-testid={`chama-aviso-${condominio.condominio_id}`}
          >
            <SiGooglehangoutsmeet size={20} />
          </button>


        </div>
      </section>
    </Container>
  );
};

export default Condominio;
