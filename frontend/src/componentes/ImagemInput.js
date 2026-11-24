import holder from '../assets/holder.jpg';

const LADO_MAX = 600;

// Reduz a imagem escolhida e devolve como data URL (JPEG), para guardar direto no banco.
const redimensionar = (arquivo) =>
  new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = reject;
    leitor.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const escala = Math.min(1, LADO_MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });

const ImagemInput = ({ value, onChange }) => {
  const escolher = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    try {
      onChange(await redimensionar(arquivo));
    } catch {
      alert('Não foi possível ler essa imagem.');
    }
    e.target.value = '';
  };

  return (
    <div className="imagem-input">
      <img src={value || holder} alt="Capa do livro" />
      <div className="imagem-input-acoes">
        <strong>Imagem do livro</strong>
        <label className="primary-btn compact imagem-btn">
          {value ? 'Trocar imagem' : 'Escolher imagem'}
          <input type="file" accept="image/*" onChange={escolher} hidden />
        </label>
        {value && (
          <button type="button" className="acao-link excluir" style={{ marginLeft: 0 }} onClick={() => onChange('')}>
            Remover imagem
          </button>
        )}
      </div>
    </div>
  );
};

export default ImagemInput;
