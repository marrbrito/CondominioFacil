import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo2.svg';
import logoUsr from '../../assets/perfil-de-usuario-em-branco.jpg';

import { FiPower, FiPlusSquare, FiArrowDownLeft } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { HeaderOut, HeaderContent, Profile } from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const HeaderUnidade: React.FC<IHeaderProps> = ({ openModal }) => {
  const { signOut, usuario } = useAuth();

  return(
  <HeaderOut>
  <HeaderContent>
    <img src={logoImg} alt="CondominioFacil" />

    <Profile>
      <img src={logoUsr} alt={usuario.nome} />

      <div>
        <strong>{usuario.nome}</strong>
        <span>{usuario.tipo}</span>
      </div>
    </Profile>

    <button type="button" onClick={signOut}>
      <FiPower />
    </button>

    <Link to="/dashboard">
            <FiArrowDownLeft />
            Voltar para dashboard
    </Link>

    <nav>
      <div>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
        >
          <div className="text">Nova Unidade</div>
          <div className="icon">
            <FiPlusSquare size={24} />
          </div>
        </button>
      </div>
    </nav>

  </HeaderContent>
  </HeaderOut>
  )};


/*const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <HeaderContent>
    <header>
      <img src={Logo} alt="GoRestaurant" />
      <nav>
        <div>
          <button
            type="button"
            onClick={() => {
              openModal();
            }}
          >
            <div className="text">Novo Prato</div>
            <div className="icon">
              <FiPlusSquare size={24} />
            </div>
          </button>
        </div>
      </nav>
    </header>
  </HeaderContent>
);*/

export default HeaderUnidade;
