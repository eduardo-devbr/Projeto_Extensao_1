import holder from '../assets/holder.jpg';

const DetalhesLivro = ({ livro, onClose }) => {
  if (!livro) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        <div className="modal-body">
          <img src={holder} alt={`Capa de ${livro.titulo}`} className="modal-img" />
          <div className="modal-info">
            <div className="badges-row">
              <span className="badge">{livro.genero || 'Livro'}</span>
              {livro.estado_conservacao && (
                <span className="badge conservacao">{livro.estado_conservacao}</span>
              )}
            </div>
            <h2>{livro.titulo}</h2>
            <p className="modal-autor">{livro.autor}</p>

            <div className="modal-fields">
              {livro.edicao && (
                <p className="modal-field"><strong>Edição:</strong> {livro.edicao}</p>
              )}
              <p className="modal-field">
                <strong>Preço:</strong> R$ {Number(livro.preco).toFixed(2).replace('.', ',')}
              </p>
              <p className="modal-field">
                <strong>Estoque:</strong> {livro.quantidade} unidade(s)
              </p>
              {livro.localizacao && (
                <p className="modal-field"><strong>Localização:</strong> {livro.localizacao}</p>
              )}
            </div>

            {livro.sinopse && (
              <div className="modal-sinopse-box">
                <h4>Sinopse</h4>
                <p className="modal-sinopse">{livro.sinopse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesLivro;
