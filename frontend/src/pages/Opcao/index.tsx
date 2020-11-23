import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderOpcao from '../../components/HeaderOpcao';
import OpcaoC from '../../components/Opcao';
import ModalAddOpcao from '../../components/ModalAddOpcao';
import ModalEditOpcao from '../../components/ModalEditOpcao';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IOpcao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  opcao_id: string;
  descricao: string;
}

interface OpcaoParams {
  condominio: string;
  reuniao: string;
  pauta: string;
  votacao: string;
}
const Opcao: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<OpcaoParams>();

  const [opcoes, setOpcoes] = useState<IOpcao[]>([]);
  const [editingOpcao, setEditingOpcao] = useState<IOpcao>({} as IOpcao);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadOpcoes(): Promise<void> {

      const response = await api.get('/opcao', {
        params: {
          condominio_id: params.condominio,
          reuniao_id: params.reuniao,
          pauta_id: params.pauta,
          votacao_id: params.votacao,
        }
      }
      );
      setOpcoes(response.data);
    }

    loadOpcoes();
  }, []);


  async function handleAddOpcao(
    opcao: Omit<IOpcao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id' | 'opcao_id'>,
  ): Promise<void> {
    try {
      const { descricao } = opcao;

      const response = await api.post('/opcao', {
        descricao,
        pauta_id: params.pauta,
        votacao_id: params.votacao,
      });

      setOpcoes(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateOpcao(
    opcao: Omit<IOpcao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id' | 'opcao_id'>,
  ): Promise<void> {
    const { descricao } = opcao;
    const { opcao_id } = editingOpcao;

    const response = await api.put(`/opcao/${opcao_id}`, {
      descricao,
    });

    setOpcoes(state => {
      return state.map(opcaoState => {
        if (opcaoState.opcao_id === opcao_id) {
          return { ...response.data };
        }
        return opcaoState;
      });
    });
  }

  async function handleDeleteOpcao(opcao_id: string): Promise<void> {
    await api.delete(`/opcao/${opcao_id}`);

    const filteredOpcoes = opcoes.filter(opcao => opcao.opcao_id !== opcao_id);
    setOpcoes(filteredOpcoes);
  }

  async function handleVolta(condominio_id: string, reuniao_id: string): Promise<void> {
    let cond = params.condominio;
    let reun = params.reuniao;
    let paut = params.pauta;
    history.push(`/${cond}/${reun}/${paut}/votacao`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditOpcao(opcao: IOpcao): void {
    setEditingOpcao(opcao);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderOpcao openModal={toggleModal} />
    <ModalAddOpcao
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddOpcao={handleAddOpcao}
      />
      <ModalEditOpcao
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingOpcao={editingOpcao}
        handleUpdateOpcao={handleUpdateOpcao}
      />

    <Content>
    {opcoes &&
          opcoes.map(opcao => (
            <OpcaoC
              key={opcao.opcao_id}
              opcao={opcao}
              handleDelete={handleDeleteOpcao}
              handleEditOpcao={handleEditOpcao}
              handleVolta={handleVolta}
            />
          ))}
    </Content>
    </>
  );
};

export default Opcao;
