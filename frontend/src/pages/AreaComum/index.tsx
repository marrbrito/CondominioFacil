import React, { useState, useEffect } from 'react';

import { useRouteMatch } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderAreaComum from '../../components/HeaderAreaComum';
import AreaComumC from '../../components/AreaComum';
import ModalAddAreaComum from '../../components/ModalAddAreaComum';
import ModalEditAreaComum from '../../components/ModalEditAreaComum';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IAreaComum {
  condominio_id: string;
  area_id: string;
  descricao: string;
  valor_locacao: number;
}

interface AreaComumParams {
  condominio: string;
}
const AreaComum: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const { params } = useRouteMatch<AreaComumParams>();

  const [areas, setAreas] = useState<IAreaComum[]>([]);
  const [editingAreaComum, setEditingAreaComum] = useState<IAreaComum>({} as IAreaComum);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadAreas(): Promise<void> {

      const response = await api.get('/areacomum', {
        params: {
          condominio_id: params.condominio,
        }
      }
      );
      setAreas(response.data);
    }

    loadAreas();
  }, []);


  async function handleAddAreaComum(
    area: Omit<IAreaComum, 'condominio_id' | 'area_id'>,
  ): Promise<void> {
    try {
      const { descricao, valor_locacao } = area;

      const response = await api.post('/areacomum', {
        descricao,
        valor_locacao,
        condominio_id: params.condominio
      });

      setAreas(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAreaComum(
    area: Omit<IAreaComum, 'condominio_id' | 'area_id'>,
  ): Promise<void> {
    const { descricao, valor_locacao } = area;
    const { area_id } = editingAreaComum;

    const response = await api.put(`/areacomum/${area_id}`, {
      descricao,
      valor_locacao,
    });

    setAreas(state => {
      return state.map(areaState => {
        if (areaState.area_id === area_id) {
          return { ...response.data };
        }
        return areaState;
      });
    });
  }

  async function handleDeleteAreaComum(area_id: string): Promise<void> {
    await api.delete(`/areacomum/${area_id}`);

    const filteredAreas = areas.filter(area => area.area_id !== area_id);
    setAreas(filteredAreas);
  }


  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditAreaComum(area: IAreaComum): void {
    setEditingAreaComum(area);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderAreaComum openModal={toggleModal} />
    <ModalAddAreaComum
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddAreaComum={handleAddAreaComum}
      />
      <ModalEditAreaComum
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingAreaComum={editingAreaComum}
        handleUpdateAreaComum={handleUpdateAreaComum}
      />

    <Content>
    {areas &&
          areas.map(area => (
            <AreaComumC
              key={area.area_id}
              area={area}
              handleDelete={handleDeleteAreaComum}
              handleEditAreaComum={handleEditAreaComum}
            />
          ))}
    </Content>
    </>
  );
};

export default AreaComum;
