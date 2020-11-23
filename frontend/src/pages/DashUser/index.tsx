import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Content,
} from './styles';


import Header from '../../components/HeaderUser';
import PessoaAutorizadaC from '../../components/PessoaAutorizada';
import ModalAddPessoaAutorizada from '../../components/ModalAddPessoaAutorizada';
import ModalEditPessoaAutorizada from '../../components/ModalEditPessoaAutorizada';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

interface IPessoaAutorizada {
  pessoa_aut_id: string;
  unidade_id: string;
  condominio_id: string;
  bloco_id: string;
  nome: string;
  num_doc: string;
}

const DashUser: React.FC  = () => {

  const { signOut, usuario } = useAuth();

  const history = useHistory();

  const [pessoas, setPessoas] = useState<IPessoaAutorizada[]>([]);
  const [editingPessoaAutorizada, setEditingPessoaAutorizada] = useState<IPessoaAutorizada>({} as IPessoaAutorizada);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadPessoas(): Promise<void> {
      const response = await api.get('/pessoaautorizada');
      setPessoas(response.data);
    }

    loadPessoas();
  }, []);


  async function handleAddPessoaAutorizada(
    pessoaautorizada: Omit<IPessoaAutorizada, 'condominio_id' | 'bloco_id' | 'unidade_id' | 'pessoa_aut_id'>,
  ): Promise<void> {
    try {
      const { nome, num_doc } = pessoaautorizada;

      const response = await api.post('pessoaautorizada', {
        nome,
        num_doc,
        unidade_id: 'b073d361-3383-4689-ada1-d7cfe84106b8',
        bloco_id: 'f198b3ec-1d3d-4272-85ba-3638a52465e3',
        condominio_id: '2627d5ba-9a10-4908-9eba-6297579c3991'
      });

      setPessoas(state => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdatePessoaAutorizada(
    pessoaautorizada: Omit<IPessoaAutorizada, 'condominio_id' | 'bloco_id' | 'unidade_id' | 'pessoa_aut_id'>,
  ): Promise<void> {
    const { nome, num_doc } = pessoaautorizada;
    const { pessoa_aut_id } = editingPessoaAutorizada;

    const response = await api.put(`/pessoaautorizada/${pessoa_aut_id}`, {
      nome,
      num_doc,
    });

    setPessoas(state => {
      return state.map(pessState => {
        if (pessState.pessoa_aut_id === pessoa_aut_id) {
          return { ...response.data };
        }
        return pessState;
      });
    });
  }

  async function handleDeletePessoaAutorizada(pessoa_aut_id: string): Promise<void> {
    await api.delete(`/pessoaautorizada/${pessoa_aut_id}`);

    const filteredPess = pessoas.filter(pess => pess.pessoa_aut_id !== pessoa_aut_id);
    setPessoas(filteredPess);
  }

  async function handleChamaAutorizacao(pessoa_aut_id: string): Promise<void> {
    history.push(`/${pessoa_aut_id}/autorizacao`);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditPessoaAutorizada(pessoaautorizada: IPessoaAutorizada): void {
    setEditingPessoaAutorizada(pessoaautorizada);
    setEditModalOpen(true);
  }

  return (
    <>
    <Header openModal={toggleModal} />
    <ModalAddPessoaAutorizada
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddPessoaAutorizada={handleAddPessoaAutorizada}
      />
      <ModalEditPessoaAutorizada
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingPessoaAutorizada={editingPessoaAutorizada}
        handleUpdatePessoaAutorizada={handleUpdatePessoaAutorizada}
      />

    <Content>
    {pessoas &&
          pessoas.map(pessoaautorizada => (
            <PessoaAutorizadaC
              key={pessoaautorizada.condominio_id}
              pessoaautorizada={pessoaautorizada}
              handleDelete={handleDeletePessoaAutorizada}
              handleEditPessoaAutorizada={handleEditPessoaAutorizada}
              handleChamaAutorizacao={handleChamaAutorizacao}
            />
          ))}
    </Content>
    </>
  );
};

export default DashUser;
