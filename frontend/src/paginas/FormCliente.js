import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../componentes/Header';
import { buscarCliente, criarCliente, atualizarCliente } from '../api';

// Serve para cadastrar (/clientes/novo) e editar (/clientes/:id/editar)
const FormCliente = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(editando ? null : { nome: '', email: '', telefone: '' });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (!editando) return;
    buscarCliente(id)
      .then((c) => setForm({ nome: c.nome || '', email: c.email || '', telefone: c.telefone || '' }))
      .catch(() => setMensagem('Cliente não encontrado.'));
  }, [id, editando]);

  if (!form) {
    return (
      <>
        <Header />
        <main className="page narrow"><div className="alert">{mensagem || 'Carregando...'}</div></main>
      </>
    );
  }

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (editando) await atualizarCliente(id, form);
      else await criarCliente(form);
      setMensagem(editando ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
      setTimeout(() => navigate('/clientes'), 600);
    } catch {
      setMensagem('Não foi possível salvar. Verifique se a API está ligada.');
    }
  };

  return (
    <>
      <Header />
      <main className="page narrow">
        <div className="page-heading">
          <div>
            <span className="eyebrow">CADASTRO</span>
            <h1>{editando ? 'Editar cliente' : 'Novo cliente'}</h1>
            <p>{editando ? 'Altere os dados do cliente.' : 'Cadastre um novo cliente.'}</p>
          </div>
        </div>
        <form className="form-card" onSubmit={salvar}>
          <div className="form-grid">
            <label className="form-span">Nome<input name="nome" value={form.nome} onChange={alterar} required /></label>
            <label>E-mail<input type="email" name="email" value={form.email} onChange={alterar} /></label>
            <label>Telefone<input name="telefone" value={form.telefone} onChange={alterar} placeholder="(00) 00000-0000" /></label>
          </div>
          {mensagem && <div className="alert">{mensagem}</div>}
          <div className="form-actions">
            <Link to="/clientes" className="back-link">Cancelar</Link>
            <button className="primary-btn" type="submit">{editando ? 'Salvar alterações' : 'Salvar cliente'}</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default FormCliente;
