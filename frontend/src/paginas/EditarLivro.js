import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../componentes/Header';
import { buscarLivro, atualizarLivro } from '../api';

const EditarLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarLivro(id)
      .then((livro) =>
        setForm({
          titulo: livro.titulo || '',
          autor: livro.autor || '',
          genero: livro.genero || '',
          preco: livro.preco ?? '',
          quantidade: livro.quantidade ?? '',
          edicao: livro.edicao || '',
          estado_conservacao: livro.estado_conservacao || '',
          sinopse: livro.sinopse || '',
          localizacao: livro.localizacao || '',
        })
      )
      .catch(() => setMensagem('Livro não encontrado.'));
  }, [id]);

  if (!form) {
    return (
      <>
        <Header gestao />
        <main className="page narrow">
          <div className="alert">{mensagem || 'Carregando...'}</div>
        </main>
      </>
    );
  }

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const salvar = async (e) => {
    e.preventDefault();
    try {
      await atualizarLivro(id, {
        ...form,
        preco: Number(form.preco),
        quantidade: Number(form.quantidade),
      });
      setMensagem('Livro atualizado com sucesso!');
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
            <h1>Editar livro</h1>
            <p>Altere as informações do livro cadastrado.</p>
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
            <Link to="/livros" className="back-link">Cancelar</Link>
            <button className="primary-btn" type="submit">Salvar alterações</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditarLivro;
