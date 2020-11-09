import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderBloco from '../../components/HeaderBloco';
import BlocoC from '../../components/Bloco';
import ModalAddBloco from '../../components/ModalAddBloco';
import ModalEditBloco from '../../components/ModalEditBloco';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IBloco {
  condominio_id: string;
  bloco_id: string;
  descricao: string;
}

interface BlocoParams {
  condominio: string;
}
const Bloco: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<BlocoParams>();

  const [blocos, setBlocos] = useState<IBloco[]>([]);
  const [editingBloco, setEditingBloco] = useState<IBloco>({} as IBloco);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadBlocos(): Promise<void> {

      const response = await api.get('/bloco', {
        params: {
          condominio_id: params.condominio,
        }
      }
      );
      setBlocos(response.data);
    }

    loadBlocos();
  }, []);


  async function handleAddBloco(
    bloco: Omit<IBloco, 'condominio_id' | 'bloco_id'>,
  ): Promise<void> {
    try {
      const { descricao } = bloco;

      const response = await api.post('/bloco', {
        descricao,
        condominio_id: params.condominio
      });

      setBlocos(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateBloco(
    bloco: Omit<IBloco, 'condominio_id' | 'bloco_id'>,
  ): Promise<void> {
    const { descricao } = bloco;
    const { bloco_id } = editingBloco;

    const response = await api.put(`/bloco/${bloco_id}`, {
      descricao,
    });

    setBlocos(state => {
      return state.map(blocoState => {
        if (blocoState.bloco_id === bloco_id) {
          return { ...response.data };
        }
        return blocoState;
      });
    });
  }

  async function handleDeleteBloco(bloco_id: string): Promise<void> {
    await api.delete(`/bloco/${bloco_id}`);

    const filteredBlocos = blocos.filter(bloco => bloco.bloco_id !== bloco_id);
    setBlocos(filteredBlocos);
  }

  async function handleChamaUnidade(condominio_id: string, bloco_id: string): Promise<void> {
    history.push(`/${condominio_id}/${bloco_id}/unidade`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditBloco(bloco: IBloco): void {
    setEditingBloco(bloco);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderBloco openModal={toggleModal} />
    <ModalAddBloco
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBloco={handleAddBloco}
      />
      <ModalEditBloco
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingBloco={editingBloco}
        handleUpdateBloco={handleUpdateBloco}
      />

    <Content>
    {blocos &&
          blocos.map(bloco => (
            <BlocoC
              key={bloco.bloco_id}
              bloco={bloco}
              handleDelete={handleDeleteBloco}
              handleEditBloco={handleEditBloco}
              handleChamaUnidade={handleChamaUnidade}
            />
          ))}
    </Content>
    </>
  );
};

export default Bloco;
