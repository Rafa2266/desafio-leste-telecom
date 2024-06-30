
import { Link } from 'react-router-dom';
import './style.css';

function Header(){
  return(
    <header>
      <h2>Leste Telecom</h2>

      <div>
        <Link to="/">Lista de Contatos</Link>
        <Link to="/">Estatístca dos Contatos</Link>
      </div>
    </header>
  )
}

export default Header;