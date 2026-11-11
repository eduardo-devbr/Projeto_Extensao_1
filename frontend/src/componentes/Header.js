import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/livros" className="logo-link">
        <div className="logo">
          <span className="logo-mark">SC</span>
          <div>
            <strong>Sebo do Cesar</strong>
            <small>Livros usados e raridades</small>
          </div>
        </div>
      </Link>

      <nav className="nav-links">
        <Link className={location.pathname === '/livros' || location.pathname === '/' ? 'active' : ''} to="/livros">Catálogo</Link>
        <Link className={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>
        <Link className={location.pathname === '/clientes' ? 'active' : ''} to="/clientes">Clientes</Link>
        <Link className="nav-management" to="/livros/novo">+ Novo livro</Link>
      </nav>
    </header>
  );
};

export default Header;
