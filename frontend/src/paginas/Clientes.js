import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import { listarClientes } from '../api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    listarClientes()
      .then(setClientes)
      .catch(() => setErro('Não foi possível conectar à API. Inicie o Flask na porta 5000.'));
  }, []);

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-heading">
          <div>
            <span className="eyebrow">CADASTRO</span>
            <h1>Clientes</h1>
            <p>Gerencie os clientes cadastrados na loja.</p>
          </div>
          <Link className="primary-btn compact" to="/clientes/novo">+ Novo cliente</Link>
        </div>
        {erro && <div className="alert">{erro}</div>}
        <section className="panel table-panel">
          <table>
            <thead>
              <tr><th>Cliente</th><th>E-mail</th><th>Telefone</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.nome}</strong></td>
                  <td>{c.email || '—'}</td>
                  <td>{c.telefone || '—'}</td>
                  <td><span className="status">Ativo</span></td>
                  <td><Link className="acao-link detalhes" to={`/clientes/${c.id}/editar`}>Editar</Link></td>
                </tr>
              ))}
              {clientes.length === 0 && !erro && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted)' }}>Nenhum cliente cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Clientes;
