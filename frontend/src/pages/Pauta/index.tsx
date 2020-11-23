import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";

import {
  Content,
} from './styles';


import HeaderPauta from '../../components/HeaderPauta';
import PautaC from '../../components/Pauta';
import ModalAddPauta from '../../components/ModalAddPauta';
import ModalEditPauta from '../../components/ModalEditPauta';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IPauta {
  condominio_id: string;
  reuniao_id: string;
  pauta_id: string;
  descricao: string;
  numero: number;
}

interface PautaParams {
  condominio: string;
  reuniao: string;
}
const Pauta: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const { params } = useRouteMatch<PautaParams>();

  const [pautas, setPautas] = useState<IPauta[]>([]);
  const [editingPauta, setEditingPauta] = useState<IPauta>({} as IPauta);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadPautas(): Promise<void> {

      const response = await api.get('/pauta', {
        params: {
          reuniao_id: params.reuniao,
        }
      }
      );
      setPautas(response.data);
    }

    loadPautas();
  }, []);


  async function handleAddPauta(
    pauta: Omit<IPauta, 'condominio_id' | 'reuniao_id' | 'pauta_id'>,
  ): Promise<void> {
    try {
      const { descricao, numero } = pauta;

      const response = await api.post('/pauta', {
        descricao,
        numero,
        condominio_id: params.condominio,
        reuniao_id: params.reuniao
      });

      setPautas(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdatePauta(
    pauta: Omit<IPauta, 'condominio_id' | 'reuniao_id' | 'pauta_id'>,
  ): Promise<void> {
    const { descricao, numero } = pauta;
    const { pauta_id } = editingPauta;

    const response = await api.put(`/pauta/${pauta_id}`, {
      descricao,
      numero,
    });

    setPautas(state => {
      return state.map(pautaState => {
        if (pautaState.pauta_id === pauta_id) {
          return { ...response.data };
        }
        return pautaState;
      });
    });
  }

  async function handleDeletePauta(pauta_id: string): Promise<void> {
    await api.delete(`/pauta/${pauta_id}`);

    const filteredPautas = pautas.filter(pauta => pauta.pauta_id !== pauta_id);
    setPautas(filteredPautas);
  }

  async function handleVolta(condominio_id: string): Promise<void> {
    let cond = params.condominio;
    history.push(`/${cond}/reuniao`);
  }

  async function handleChamaVotacao(condominio_id: string, reuniao_id: string, pauta_id: string): Promise<void> {
    let cond = params.condominio;
    let reun = params.reuniao;
    history.push(`/${cond}/${reun}/${pauta_id}/votacao`);
  }


  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditPauta(pauta: IPauta): void {
    setEditingPauta(pauta);
    setEditModalOpen(true);
  }

  return (
    <>
    <HeaderPauta openModal={toggleModal} />
    <ModalAddPauta
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddPauta={handleAddPauta}
      />
      <ModalEditPauta
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingPauta={editingPauta}
        handleUpdatePauta={handleUpdatePauta}
      />

    <Content>
    {pautas &&
          pautas.map(pauta => (
            <PautaC
              key={pauta.pauta_id}
              pauta={pauta}
              handleDelete={handleDeletePauta}
              handleEditPauta={handleEditPauta}
              handleVolta={handleVolta}
              handleChamaVotacao={handleChamaVotacao}
            />
          ))}
    </Content>
    </>
  );
};

export default Pauta;
