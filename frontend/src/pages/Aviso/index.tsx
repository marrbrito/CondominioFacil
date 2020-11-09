import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderAviso from '../../components/HeaderAviso';
import AvisoC from '../../components/Aviso';
import ModalAddAviso from '../../components/ModalAddAviso';
import ModalEditAviso from '../../components/ModalEditAviso';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IAviso {
  condominio_id: string;
  aviso_id: string;
  descricao: string;
  dt_expiracao: Date;
}

interface AvisoParams {
  condominio: string;
}
const Aviso: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<AvisoParams>();

  const [avisos, setAvisos] = useState<IAviso[]>([]);
  const [editingAviso, setEditingAviso] = useState<IAviso>({} as IAviso);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadAvisos(): Promise<void> {

      const response = await api.get('/aviso', {
        params: {
          condominio_id: params.condominio,
        }
      }
      );
      setAvisos(response.data);
    }

    loadAvisos();
  }, []);


  async function handleAddAviso(
    aviso: Omit<IAviso, 'condominio_id' | 'aviso_id'>,
  ): Promise<void> {
    try {
      const { descricao, dt_expiracao } = aviso;

      const response = await api.post('/aviso', {
        descricao,
        dt_expiracao,
        condominio_id: params.condominio
      });

      setAvisos(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAviso(
    aviso: Omit<IAviso, 'condominio_id' | 'aviso_id'>,
  ): Promise<void> {
    const { descricao, dt_expiracao } = aviso;
    const { aviso_id } = editingAviso;

    const response = await api.put(`/aviso/${aviso_id}`, {
      descricao,
      dt_expiracao,
    });

    setAvisos(state => {
      return state.map(avisoState => {
        if (avisoState.aviso_id === aviso_id) {
          return { ...response.data };
        }
        return avisoState;
      });
    });
  }

  async function handleDeleteAviso(aviso_id: string): Promise<void> {
    await api.delete(`/aviso/${aviso_id}`);

    const filteredAvisos = avisos.filter(aviso => aviso.aviso_id !== aviso_id);
    setAvisos(filteredAvisos);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditAviso(aviso: IAviso): void {
    setEditingAviso(aviso);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderAviso openModal={toggleModal} />
    <ModalAddAviso
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddAviso={handleAddAviso}
      />
      <ModalEditAviso
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingAviso={editingAviso}
        handleUpdateAviso={handleUpdateAviso}
      />

    <Content>
    {avisos &&
          avisos.map(aviso => (
            <AvisoC
              key={aviso.aviso_id}
              aviso={aviso}
              handleDelete={handleDeleteAviso}
              handleEditAviso={handleEditAviso}
            />
          ))}
    </Content>
    </>
  );
};

export default Aviso;
