import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderReuniao from '../../components/HeaderReuniao';
import ReuniaoC from '../../components/Reuniao';
import ModalAddReuniao from '../../components/ModalAddReuniao';
import ModalEditReuniao from '../../components/ModalEditReuniao';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IReuniao {
  condominio_id: string;
  reuniao_id: string;
  descricao: string;
  dt_reuniao: Date;
}

interface ReuniaoParams {
  condominio: string;
}
const Reuniao: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<ReuniaoParams>();

  const [reunioes, setReunioes] = useState<IReuniao[]>([]);
  const [editingReuniao, setEditingReuniao] = useState<IReuniao>({} as IReuniao);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadReunioes(): Promise<void> {

      const response = await api.get('/reuniao', {
        params: {
          condominio_id: params.condominio,
        }
      }
      );
      setReunioes(response.data);
    }

    loadReunioes();
  }, []);


  async function handleAddReuniao(
    reuniao: Omit<IReuniao, 'condominio_id' | 'reuniao_id'>,
  ): Promise<void> {
    try {
      const { descricao, dt_reuniao } = reuniao;

      const response = await api.post('/reuniao', {
        descricao,
        dt_reuniao,
        condominio_id: params.condominio
      });

      setReunioes(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateReuniao(
    reuniao: Omit<IReuniao, 'condominio_id' | 'reuniao_id'>,
  ): Promise<void> {
    const { descricao, dt_reuniao } = reuniao;
    const { reuniao_id } = editingReuniao;

    const response = await api.put(`/reuniao/${reuniao_id}`, {
      descricao,
      dt_reuniao,
    });

    setReunioes(state => {
      return state.map(reuniaoState => {
        if (reuniaoState.reuniao_id === reuniao_id) {
          return { ...response.data };
        }
        return reuniaoState;
      });
    });
  }

  async function handleDeleteReuniao(reuniao_id: string): Promise<void> {
    await api.delete(`/reuniao/${reuniao_id}`);

    const filteredAreas = reunioes.filter(reuniao => reuniao.reuniao_id !== reuniao_id);
    setReunioes(filteredAreas);
  }

  async function handleChamaPauta(condominio_id: string, reuniao_id: string): Promise<void> {
    history.push(`/${condominio_id}/${reuniao_id}/pauta`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditReuniao(reuniao: IReuniao): void {
    setEditingReuniao(reuniao);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderReuniao openModal={toggleModal} />
    <ModalAddReuniao
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddReuniao={handleAddReuniao}
      />
      <ModalEditReuniao
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingReuniao={editingReuniao}
        handleUpdateReuniao={handleUpdateReuniao}
      />

    <Content>
    {reunioes &&
          reunioes.map(reuniao => (
            <ReuniaoC
              key={reuniao.reuniao_id}
              reuniao={reuniao}
              handleDelete={handleDeleteReuniao}
              handleEditReuniao={handleEditReuniao}
              handleChamaPauta={handleChamaPauta}
            />
          ))}
    </Content>
    </>
  );
};

export default Reuniao;
