import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderVotacao from '../../components/HeaderVotacao';
import VotacaoC from '../../components/Votacao';
import ModalAddVotacao from '../../components/ModalAddVotacao';
import ModalEditVotacao from '../../components/ModalEditVotacao';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IVotacao {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  votacao_id: string;
  dt_inicio: Date;
  dt_fim: Date;
  votos: number;
}

interface PautaParams {
  condominio: string;
  reuniao: string;
  pauta: string;
}
const Votacao: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<PautaParams>();

  const [votacoes, setVotacoes] = useState<IVotacao[]>([]);
  const [editingVotacao, setEditingVotacao] = useState<IVotacao>({} as IVotacao);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadVotacoes(): Promise<void> {

      const response = await api.get('/votacao', {
        params: {
          condominio_id: params.condominio,
          reuniao_id: params.reuniao,
          pauta_id: params.pauta,
        }
      }
      );
      setVotacoes(response.data);
    }

    loadVotacoes();
  }, []);


  async function handleAddVotacao(
    votacao: Omit<IVotacao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id'>,
  ): Promise<void> {
    try {
      const { dt_inicio, dt_fim, votos } = votacao;

      const response = await api.post('/votacao', {
        dt_inicio,
        dt_fim,
        votos: 0,
        pauta_id: params.pauta,
      });

      setVotacoes(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateVotacao(
    votacao: Omit<IVotacao, 'condominio_id' | 'reuniao_id' | 'pauta_id' | 'votacao_id'>,
  ): Promise<void> {
    const { dt_inicio, dt_fim } = votacao;
    const { votacao_id } = editingVotacao;

    const response = await api.put(`/votacao/${votacao_id}`, {
      dt_inicio,
      dt_fim,
    });

    setVotacoes(state => {
      return state.map(votacaoState => {
        if (votacaoState.votacao_id === votacao_id) {
          return { ...response.data };
        }
        return votacaoState;
      });
    });
  }

  async function handleDeleteVotacao(votacao_id: string): Promise<void> {
    await api.delete(`/votacao/${votacao_id}`);

    const filteredVotacoes = votacoes.filter(votacao => votacao.votacao_id !== votacao_id);
    setVotacoes(filteredVotacoes);
  }

  async function handleVolta(condominio_id: string, reuniao_id: string): Promise<void> {
    let cond = params.condominio;
    let reun = params.reuniao;
    history.push(`/${cond}/${reun}/pauta`);
  }

  async function handleChamaOpcao(condominio_id: string, reuniao_id: string, pauta_id: string, votacao_id: string): Promise<void> {
    let cond = params.condominio;
    let reun = params.reuniao;
    let paut = params.pauta;
    history.push(`/${cond}/${reun}/${paut}/${votacao_id}/opcao`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditVotacao(votacao: IVotacao): void {
    setEditingVotacao(votacao);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderVotacao openModal={toggleModal} />
    <ModalAddVotacao
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddVotacao={handleAddVotacao}
      />
      <ModalEditVotacao
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingVotacao={editingVotacao}
        handleUpdateVotacao={handleUpdateVotacao}
      />

    <Content>
    {votacoes &&
          votacoes.map(votacao => (
            <VotacaoC
              key={votacao.votacao_id}
              votacao={votacao}
              handleDelete={handleDeleteVotacao}
              handleEditVotacao={handleEditVotacao}
              handleVolta={handleVolta}
              handleChamaOpcao={handleChamaOpcao}
            />
          ))}
    </Content>
    </>
  );
};

export default Votacao;
