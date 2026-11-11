import { useEffect, useState } from 'react';
import Header from '../componentes/Header';
import Livro from '../componentes/Livro';
import DetalhesLivro from '../componentes/DetalhesLivro';
import { listarLivros, removerLivro } from '../api';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    listarLivros()
      .then(setLivros)
      .catch(() => setErro('Não foi possível conectar à API. Inicie o Flask na porta 5000.'));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este livro?')) return;
    try {
      await removerLivro(id);
      setLivros((prev) => prev.filter((l) => l.id !== id));
    } catch {
      setErro('Não foi possível remover o livro.');
    }
  };

  const filtrados = livros.filter((livro) =>
    `${livro.titulo} ${livro.autor} ${livro.genero} ${livro.edicao || ''} ${livro.estado_conservacao || ''}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="page catalog-page">
        <section className="hero">
          <div>
            <span className="eyebrow">CATÁLOGO ONLINE</span>
            <h1>Encontre seu próximo livro.</h1>
            <p>Explore nosso acervo e descubra clássicos, raridades e boas histórias.</p>
          </div>
          <div className="hero-stat">
            <strong>{livros.length}</strong>
            <span>livros cadastrados</span>
          </div>
        </section>

        <div className="toolbar">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título, autor, gênero, edição ou estado..."
          />
          <span>{filtrados.length} resultado(s)</span>
        </div>

        {erro && <div className="alert">{erro}</div>}

        <section className="livros-grid">
          {filtrados.length > 0
            ? filtrados.map((livro) => (
                <Livro
                  key={livro.id}
                  livro={livro}
                  onDelete={handleDelete}
                  onDetalhes={setDetalhes}
                />
              ))
            : (
              <div className="empty">
                <h2>Nenhum livro encontrado</h2>
                <p>Cadastre livros pela área administrativa ou altere a busca.</p>
              </div>
            )
          }
        </section>
      </main>

      <DetalhesLivro livro={detalhes} onClose={() => setDetalhes(null)} />
    </>
  );
};

export default Livros;
