import Header from '../componentes/Header';

const clientes = [
  { nome: 'Mariana Oliveira', email: 'mariana@email.com', compras: 8, ultima: '18/09/2026' },
  { nome: 'Rafael Santos', email: 'rafael@email.com', compras: 5, ultima: '15/09/2026' },
  { nome: 'Lucas Almeida', email: 'lucas@email.com', compras: 3, ultima: '12/09/2026' },
  { nome: 'Beatriz Costa', email: 'beatriz@email.com', compras: 11, ultima: '09/09/2026' },
];

const Clientes = () => (
  <><Header gestao /><main className="page"><div className="page-heading"><div><span className="eyebrow">CADASTRO</span><h1>Clientes</h1><p>Exemplo de tela para gerenciamento do relacionamento com clientes.</p></div><button className="primary-btn compact" onClick={() => alert('Fluxo de cadastro demonstrativo da POC.')}>+ Novo cliente</button></div>
    <section className="panel table-panel"><table><thead><tr><th>Cliente</th><th>E-mail</th><th>Compras</th><th>Última compra</th><th>Status</th></tr></thead><tbody>{clientes.map((c) => <tr key={c.email}><td><strong>{c.nome}</strong></td><td>{c.email}</td><td>{c.compras}</td><td>{c.ultima}</td><td><span className="status">Ativo</span></td></tr>)}</tbody></table></section>
  </main></>
);

export default Clientes;
