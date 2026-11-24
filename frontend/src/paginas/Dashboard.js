import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import { listarLivros } from '../api';

const Dashboard = () => {
  const [livros, setLivros] = useState([]);

  useEffect(() => { listarLivros().then(setLivros).catch(() => {}); }, []);

  const unidades = livros.reduce((total, l) => total + Number(l.quantidade || 0), 0);
  const valorEstoque = livros.reduce((total, l) => total + Number(l.preco || 0) * Number(l.quantidade || 0), 0);
  const baixoEstoque = livros.filter((l) => Number(l.quantidade) <= 2);

  return (
    <>
      <Header gestao />
      <main className="page">
        <div className="page-heading"><div><span className="eyebrow">VISÃO GERAL</span><h1>Dashboard</h1><p>Indicadores calculados a partir do banco SQLite.</p></div><Link className="primary-btn compact" to="/livros/novo">+ Novo livro</Link></div>
        <section className="stats-grid">
          <div className="stat-card"><span>Livros cadastrados</span><strong>{livros.length}</strong><small>itens diferentes</small></div>
          <div className="stat-card"><span>Unidades em estoque</span><strong>{unidades}</strong><small>exemplares disponíveis</small></div>
          <div className="stat-card"><span>Valor do estoque</span><strong>R$ {valorEstoque.toFixed(2).replace('.', ',')}</strong><small>valor estimado</small></div>
          <div className="stat-card warning"><span>Estoque baixo</span><strong>{baixoEstoque.length}</strong><small>livros com até 2 unidades</small></div>
        </section>
        <section className="panel">
          <div className="panel-title"><h2>Atenção ao estoque</h2><Link to="/livros">Ver catálogo</Link></div>
          {baixoEstoque.length ? baixoEstoque.map((l) => <div className="stock-row" key={l.id}><div><strong>{l.titulo}</strong><span>{l.autor}</span></div><b>{l.quantidade} un.</b></div>) : <p>Nenhum livro com estoque baixo.</p>}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
