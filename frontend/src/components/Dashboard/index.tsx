import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Content,
} from './styles';


import Header from '../../components/Header';
import Condominio from '../../components/Condominio';
import ModalAddCondominio from '../../components/ModalAddCondominio';
import ModalEditCondominio from '../../components/ModalEditCondominio';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface ICondominio {
  condominio_id: string;
  nome: string;
  cep: string;
  endereco: string;
  telefone: string;
  email: string;
  sindico: string;
}

const Dashboard: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const [conds, setConds] = useState<ICondominio[]>([]);
  const [editingCondominio, setEditingCondominio] = useState<ICondominio>({} as ICondominio);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadConds(): Promise<void> {
      const response = await api.get('/condominio');
      setConds(response.data);
    }

    loadConds();
  }, []);


  async function handleAddCondominio(
    condominio: Omit<ICondominio, 'condominio_id'>,
  ): Promise<void> {
    try {
      const { nome, cep, endereco, telefone, email, sindico } = condominio;

      const response = await api.post('condominio', {
        nome,
        cep,
        endereco,
        telefone,
        email,
        sindico
      });

      setConds(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateCondominio(
    condominio: Omit<ICondominio, 'condominio_id'>,
  ): Promise<void> {
    const { nome, cep, endereco, telefone, email, sindico } = condominio;
    const { condominio_id } = editingCondominio;

    const response = await api.put(`/condominio/${condominio_id}`, {
      nome,
      cep,
      endereco,
      telefone,
      email,
      sindico
    });

    setConds(state => {
      return state.map(condState => {
        if (condState.condominio_id === condominio_id) {
          return { ...response.data };
        }
        return condState;
      });
    });
  }

  async function handleDeleteCondominio(condominio_id: string): Promise<void> {
    await api.delete(`/condominio/${condominio_id}`);

    const filteredConds = conds.filter(cond => cond.condominio_id !== condominio_id);
    setConds(filteredConds);
  }

  async function handleChamaBloco(condominio_id: string): Promise<void> {
    history.push(`/${condominio_id}/bloco`);
  }

  async function handleChamaAreaComum(condominio_id: string): Promise<void> {
    history.push(`/${condominio_id}/areacomum`);
  }

  async function handleChamaAviso(condominio_id: string): Promise<void> {
    history.push(`/${condominio_id}/aviso`);
  }

  async function handleChamaReuniao(condominio_id: string): Promise<void> {
    history.push(`/${condominio_id}/reuniao`);
  }


  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditCondominio(condominio: ICondominio): void {
    setEditingCondominio(condominio);
    setEditModalOpen(true);
  }

  return (
    <>
    <Header openModal={toggleModal} />
    <ModalAddCondominio
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddCondominio={handleAddCondominio}
      />
      <ModalEditCondominio
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingCondominio={editingCondominio}
        handleUpdateCondominio={handleUpdateCondominio}
      />

    <Content>
    {conds &&
          conds.map(condominio => (
            <Condominio
              key={condominio.condominio_id}
              condominio={condominio}
              handleDelete={handleDeleteCondominio}
              handleEditCondominio={handleEditCondominio}
              handleChamaBloco={handleChamaBloco}
              handleChamaAreaComum={handleChamaAreaComum}
              handleChamaAviso={handleChamaAviso}
              handleChamaReuniao={handleChamaReuniao}
            />
          ))}
    </Content>
    </>
  );
};

export default Dashboard;
