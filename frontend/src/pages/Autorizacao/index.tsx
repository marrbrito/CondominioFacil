import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderAutorizacao from '../../components/HeaderAutorizacao';
import AutorizacaoC from '../../components/Autorizacao';
import ModalAddAutorizacao from '../../components/ModalAddAutorizacao';
import ModalEditAutorizacao from '../../components/ModalEditAutorizacao';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IAutorizacao {
  pessoa_aut_id: string;
  autorizacao_id: string;
  tipo_acesso: string;
  dt_fim: Date;
}

interface AutorizacaoParams {
  pessoaautorizada: string;
}
const Autorizacao: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<AutorizacaoParams>();

  const [autorizacoes, setAutorizacoes] = useState<IAutorizacao[]>([]);
  const [editingAutorizacao, setEditingAutorizacao] = useState<IAutorizacao>({} as IAutorizacao);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadAutorizacoes(): Promise<void> {

      const response = await api.get('/autorizacao', {
        params: {
          pessoa_aut_id: params.pessoaautorizada,
        }
      }
      );
      setAutorizacoes(response.data);
    }

    loadAutorizacoes();
  }, []);


  async function handleAddAutorizacao(
    autorizacao: Omit<IAutorizacao, 'pessoa_aut_id' | 'autorizacao_id'>,
  ): Promise<void> {
    try {
      const { tipo_acesso, dt_fim } = autorizacao;

      const response = await api.post('/autorizacao', {
        tipo_acesso,
        dt_fim,
        pessoa_aut_id: params.pessoaautorizada
      });

      setAutorizacoes(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAutorizacao(
    autorizacao: Omit<IAutorizacao, 'pessoa_aut_id' | 'autorizacao_id'>,
  ): Promise<void> {
    const { tipo_acesso, dt_fim } = autorizacao;
    const { autorizacao_id } = editingAutorizacao;

    const response = await api.put(`/autorizacao/${autorizacao_id}`, {
      tipo_acesso,
      dt_fim,
    });

    setAutorizacoes(state => {
      return state.map(autorizacaoState => {
        if (autorizacaoState.autorizacao_id === autorizacao_id) {
          return { ...response.data };
        }
        return autorizacaoState;
      });
    });
  }

  async function handleDeleteAutorizacao(autorizacao_id: string): Promise<void> {
    await api.delete(`/autorizacao/${autorizacao_id}`);

    const filteredAutorizacoes = autorizacoes.filter(autorizacao => autorizacao.autorizacao_id !== autorizacao_id);
    setAutorizacoes(filteredAutorizacoes);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditAutorizacao(autorizacao: IAutorizacao): void {
    setEditingAutorizacao(autorizacao);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderAutorizacao openModal={toggleModal} />
    <ModalAddAutorizacao
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddAutorizacao={handleAddAutorizacao}
      />
      <ModalEditAutorizacao
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingAutorizacao={editingAutorizacao}
        handleUpdateAutorizacao={handleUpdateAutorizacao}
      />

    <Content>
    {autorizacoes &&
          autorizacoes.map(autorizacao => (
            <AutorizacaoC
              key={autorizacao.autorizacao_id}
              autorizacao={autorizacao}
              handleDelete={handleDeleteAutorizacao}
              handleEditAutorizacao={handleEditAutorizacao}
            />
          ))}
    </Content>
    </>
  );
};

export default Autorizacao;
