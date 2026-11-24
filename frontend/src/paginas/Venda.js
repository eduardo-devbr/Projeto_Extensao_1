import { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import { Link } from 'react-router-dom';
import holder from '../assets/holder.jpg';
import { listarLivros, listarClientes } from '../api';
 
const salvar = () =>{}
 
const naoCadastrado = () => {const form = document.getElementById("form"); form.elements.cliente.disabled = form.elements.scliente.checked; if (form.elements.scliente.checked) form.elements.cliente.value = ""}
 
function procuraCliente(){document.querySelector(".busca-cliente").style.display = "flex"}
function fechaCliente(){setTimeout(() => {document.querySelector(".busca-cliente").style.display = "none"}, 100);}
 
function procuraLivro(){document.querySelector(".busca-livro").style.display = "flex"}
function fechaLivro(){setTimeout(() => {document.querySelector(".busca-livro").style.display = "none"}, 100)}
 
const teste = [{titulo: "livroTeste"}, {titulo: "livroTeste2"}]
 
const Venda = () =>{
    const [livros, setLivros] = useState([]);
    const [filtrados, setFiltrados] = useState([])
    const [livrosAdicionados, setAdicionados] = useState([])
    const [cliente, setCliente] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [buscaCliente, setBuscaCliente] = useState('');
 
    const filtrar = () =>{
        const form = document.getElementById("form")
 
        if(form.livro.value.trim().length >= 2){
        const form = document.querySelector(".form-card");
 
        const filt = livros.filter((livro) =>
            `${livro.titulo}`
            .toLowerCase()
            .includes(form.livro.value.trim().toLowerCase())
        );
        setFiltrados(filt)
        } else setFiltrados([])
    }
 
    const clientesFiltrados = clientes.filter((c) =>
        c.nome.toLowerCase().includes(buscaCliente.trim().toLowerCase())
    );
 
    const escolherCliente = (c) =>{
        const form = document.getElementById("form");
        form.elements.cliente.value = c.nome;
        setBuscaCliente(c.nome);
        haCliente();
    }
 
    const semCadastro = () =>{
        naoCadastrado();
        setBuscaCliente('');
        setCliente(false);
    }
 
    const haCliente = () =>{
        const form = document.getElementById("form");
 
        setBuscaCliente(form.elements.cliente.value);
        if (form.elements.cliente.value.trim().length >= 5) setCliente(true);
        else setCliente(false);
    }
 
    const adicionar = (id) =>{
        setAdicionados((livrosAdicionados) => [...livrosAdicionados, livros.find((l) => l.id == id)]);
        const form = document.getElementById("form");
        form.elements.livro.value = "";
    }
    const remover = (id) =>{setAdicionados((livrosAdicionados) => livrosAdicionados.filter((l) => l.id !== id))}
 
    useEffect(() => {
    listarLivros()
      .then(setLivros)
      .catch(() => console.log('Não foi possível conectar à API. Inicie o Flask na porta 5000.'));
    listarClientes()
      .then(setClientes)
      .catch(() => console.log('Não foi possível carregar os clientes.'));
    }, []);
 
    return(
    <>
    <Header />
    <main className="page narrow">
        <div className="page-heading">
          <div>
            <span className="eyebrow">VENDAS</span>
            <h1>Nova venda</h1>
            <p>Registre o exercicio de uma nova venda.</p>
          </div>
        </div>
 
        <div className="venda-layout">
            <form className="form-card form2" id='form' onSubmit={salvar}>
                <div className='mb10 flexr' style={{gap: "8px"}}>
                    <div style={{flex: "0 0 70%"}}><label>Cliente</label><br /> <input type="text" name='cliente' onChange={haCliente} onFocus={procuraCliente} onBlur={fechaCliente} required className='w100'/></div>
 
                    <div style={{alignItems: "center", flex: "0 0 30%", display: "flex", justifyContent: "center", gap: "5px", paddingTop:"30px"}} ><input type='checkbox' name='scliente' style={{transform: "scale(1.6)"}} onChange={semCadastro}/> <label>cliente não cadastrado</label></div>
                </div>
 
                <div className='busca busca-cliente' style={{marginTop:"-10px", width: "38.5%"}}>
                    {clientesFiltrados.map((c) => (<div key={c.id} onClick={() => escolherCliente(c)}><p>{c.nome}</p></div>))}
                    {clientesFiltrados.length === 0 && (<div><p>Nenhum cliente encontrado</p></div>)}
                </div>
 
                <div className='mb10'><label>Pagamento</label><br /> <select required name='senha' className='w100'><option value={"cash"}>Dinheiro</option> <option value={"pix"}>Pix</option> </select> </div>
 
                <div className='flexr' style={{gap: "8px"}}>
                    <div style={{flex: "0 0 80%"}}><label>Livros</label><br /> <input name='livro' className='w100' onFocus={procuraLivro} onBlur={fechaLivro} onChange={filtrar}/></div>
                    <div style={{flex: "0 0 20%", justifyItems:"center"}}>
                    <h3 style={{marginTop:"33px"}}>R$ {livrosAdicionados.length === 0 ? ("00,00") : livrosAdicionados.reduce((total, livro) => total + Number(livro.preco || 0), 0).toFixed(2)}</h3></div>
                </div>
                <div className='busca busca-livro' style={{marginTop:"-10px", width: "44%"}}>
                    {filtrados.map((l) => (<div key={l.id} onClick={() => adicionar(l.id)}><p>{l.titulo}</p></div>))}
                </div>
 
                <fieldset> <legend style={{fontSize: "14px"}}>selecionados</legend> <section className='venda-box'> 
                {livrosAdicionados.map(l => (<div className='venda-item' key={l.id}><img src={l.imagem || holder} alt='imagem livro' /> <button className='primary-btn' type="button" onClick={() => remover(l.id)} style={{fontSize: "9px", padding: "6px", borderRadius: "0"}}>X</button> </div>))} 
                {livrosAdicionados.length === 0 && (<div style={{width: "100%", alignContent:"center", justifyItems:"center"}}><h3 className='vazio'>Adicione um livro</h3></div>)} </section></fieldset>
 
                <div className="form-actions">
                    <Link to="/livros" className="back-link">Cancelar</Link>
                    <button className="primary-btn" type="submit">Registrar</button>
                </div>
            </form>
 
        <section className='rcmd'>
            {cliente ? (<><h5 style={{justifySelf: "center"}}>sugestões para o cliente</h5><div className='rcmd-imgs'><img src={holder}/><img src={holder}/><img src={holder}/></div></>) : (<div style={{width: "100%", alignContent:"center", justifyItems:"center"}}><h3 className='vazio'>Sem sugestões</h3></div>)}
        </section>
        </div>
    </main>
    </>
    )
}
 
export default Venda;