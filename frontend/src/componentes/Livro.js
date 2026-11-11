import { Link } from 'react-router-dom';
import holder from '../assets/holder.jpg';

const Livro = ({ livro, onDelete, onDetalhes }) => {
  const estoqueBaixo = Number(livro.quantidade) <= 2;

  return (
    <article className="livro-card">
      <img src={holder} alt={`Capa ilustrativa de ${livro.titulo}`} />
      <div className="livro-det">
        <div className="badges-row">
          <span className="badge">{livro.genero || 'Livro'}</span>
          {livro.estado_conservacao && (
            <span className="badge conservacao">{livro.estado_conservacao}</span>
          )}
        </div>
        <h3>{livro.titulo}</h3>
        <p>{livro.autor}</p>
        <div className="livro-footer">
          <strong>R$ {Number(livro.preco).toFixed(2).replace('.', ',')}</strong>
          <span className={estoqueBaixo ? 'estoque baixo' : 'estoque'}>
            {livro.quantidade} em estoque
          </span>
        </div>
        <div className="livro-acoes">
          <button className="acao-link detalhes" onClick={() => onDetalhes(livro)}>Detalhes</button>
          <Link className="acao-link editar" to={`/livros/${livro.id}/editar`}>Editar</Link>
          {onDelete && (
            <button className="acao-link excluir" onClick={() => onDelete(livro.id)}>Excluir</button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Livro;
