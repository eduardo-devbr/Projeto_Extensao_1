import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../componentes/Header';
import { criarLivro } from '../api';

const CadastroLivro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '', autor: '', genero: '', preco: '', quantidade: '',
    edicao: '', estado_conservacao: '', sinopse: '', localizacao: '',
  });
  const [mensagem, setMensagem] = useState('');

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const salvar = async (e) => {
    e.preventDefault();
    try {
      await criarLivro({ ...form, preco: Number(form.preco), quantidade: Number(form.quantidade) });
      setMensagem('Livro cadastrado com sucesso!');
      setTimeout(() => navigate('/livros'), 600);
    } catch {
      setMensagem('Não foi possível salvar. Verifique se a API está ligada.');
    }
  };

  return (
    <>
      <Header gestao />
      <main className="page narrow">
        <div className="page-heading">
          <div>
            <span className="eyebrow">ESTOQUE</span>
            <h1>Novo livro</h1>
            <p>Cadastre um novo item no banco de dados.</p>
          </div>
        </div>
        <form className="form-card" onSubmit={salvar}>
          <div className="form-grid">
            <label>Título<input name="titulo" value={form.titulo} onChange={alterar} required /></label>
            <label>Autor<input name="autor" value={form.autor} onChange={alterar} required /></label>
            <label>Gênero<input name="genero" value={form.genero} onChange={alterar} placeholder="Ex.: Terror" required /></label>
            <label>Edição<input name="edicao" value={form.edicao} onChange={alterar} placeholder="Ex.: 3ª edição" /></label>
            <label>Preço (R$)<input type="number" step="0.01" min="0" name="preco" value={form.preco} onChange={alterar} required /></label>
            <label>Quantidade<input type="number" min="0" name="quantidade" value={form.quantidade} onChange={alterar} required /></label>
            <label>Estado de Conservação
              <select name="estado_conservacao" value={form.estado_conservacao} onChange={alterar} className="form-select">
                <option value="">Selecione...</option>
                <option value="Novo">Novo</option>
                <option value="Seminovo">Seminovo</option>
                <option value="Usado">Usado</option>
                <option value="Restaurado">Restaurado</option>
              </select>
            </label>
            <label>Localização na Loja<input name="localizacao" value={form.localizacao} onChange={alterar} placeholder="Ex.: Estante A, Prateleira 3" /></label>
          </div>
          <label className="form-full">Sinopse<textarea name="sinopse" value={form.sinopse} onChange={alterar} rows="4" placeholder="Breve descrição do livro..." /></label>
          {mensagem && <div className="alert">{mensagem}</div>}
          <div className="form-actions">
            <Link to="/dashboard" className="back-link">Cancelar</Link>
            <button className="primary-btn" type="submit">Salvar livro</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CadastroLivro;
