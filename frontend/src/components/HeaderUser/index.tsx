import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo2.svg';
import logoUsr from '../../assets/usuario_cond.png';

import { FiPower, FiPlusSquare } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { HeaderOut, HeaderContent, Profile } from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const HeaderUser: React.FC<IHeaderProps> = ({ openModal }) => {
  const { signOut, usuario } = useAuth();

  return(
  <HeaderOut>
  <HeaderContent>
    <img src={logoImg} alt="CondominioFacil" />

    <Profile>
      <img src={logoUsr} alt={usuario.nome} />

      <div>
        <Link to="/condomino">
        <strong>{usuario.nome}</strong>
        </Link>
        <span>{usuario.tipo}</span>
      </div>
    </Profile>

    <button type="button" onClick={signOut}>
      <FiPower />
    </button>

    <nav>
      <div>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
        >
          <div className="text">Nova Pessoa Autorizada</div>
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

export default HeaderUser;
