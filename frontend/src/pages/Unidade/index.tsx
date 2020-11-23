import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderUnidade from '../../components/HeaderUnidade';
import UnidadeC from '../../components/Unidade';
import ModalAddUnidade from '../../components/ModalAddUnidade';
import ModalEditUnidade from '../../components/ModalEditUnidade';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IUnidade {
  condominio_id: string;
  bloco_id: string;
  unidade_id: string;
  identificador: string;
}

interface UnidadeParams {
  condominio: string;
  bloco: string;
}
const Unidade: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<UnidadeParams>();

  const [unidades, setUnidades] = useState<IUnidade[]>([]);
  const [editingUnidade, setEditingUnidade] = useState<IUnidade>({} as IUnidade);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadUnidades(): Promise<void> {

      const response = await api.get('/unidade', {
        params: {
          condominio_id: params.condominio,
          bloco_id: params.bloco,
        }
      }
      );
      setUnidades(response.data);
    }

    loadUnidades();
  }, []);


  async function handleAddUnidade(
    unidade: Omit<IUnidade, 'condominio_id' | 'bloco_id' | 'unidade_id'>,
  ): Promise<void> {
    try {
      const { identificador } = unidade;

      const response = await api.post('/unidade', {
        identificador,
        condominio_id: params.condominio,
        bloco_id: params.bloco
      });

      setUnidades(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateUnidade(
    unidade: Omit<IUnidade, 'condominio_id' | 'bloco_id' | 'unidade_id'>,
  ): Promise<void> {
    const { identificador } = unidade;
    const { unidade_id } = editingUnidade;

    const response = await api.put(`/unidade/${unidade_id}`, {
      identificador,
      condomino_id: null,
    });

    setUnidades(state => {
      return state.map(unidadeState => {
        if (unidadeState.unidade_id === unidade_id) {
          return { ...response.data };
        }
        return unidadeState;
      });
    });
  }

  async function handleDeleteUnidade(unidade_id: string): Promise<void> {
    await api.delete(`/unidade/${unidade_id}`);

    const filteredUnidades = unidades.filter(unidade => unidade.unidade_id !== unidade_id);
    setUnidades(filteredUnidades);
  }

  async function handleVolta(condominio_id: string): Promise<void> {
    history.push(`/${condominio_id}/bloco`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditUnidade(unidade: IUnidade): void {
    setEditingUnidade(unidade);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderUnidade openModal={toggleModal} />
    <ModalAddUnidade
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddUnidade={handleAddUnidade}
      />
      <ModalEditUnidade
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingUnidade={editingUnidade}
        handleUpdateUnidade={handleUpdateUnidade}
      />

    <Content>
    {unidades &&
          unidades.map(unidade => (
            <UnidadeC
              key={unidade.unidade_id}
              unidade={unidade}
              handleDelete={handleDeleteUnidade}
              handleEditUnidade={handleEditUnidade}
              handleVolta={handleVolta}
            />
          ))}
    </Content>
    </>
  );
};

export default Unidade;
