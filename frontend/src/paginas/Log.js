import { useState } from 'react';
import Header from '../componentes/Header';

const escolherFiltro = (e) => {
    document.querySelectorAll("#log-btn").forEach(btn => {btn.className = "";})
    e.currentTarget.className="on"
}

const registros = [
    {livro: "livroTeste", tipo: "+", data: "01/01/2001"},
    {livro: "livroTeste", tipo: "+", data: "01/01/2001"},
    {livro: "livroTeste", tipo: "+", data: "01/01/2001"},
    {livro: ["livroTeste", "livroTeste2"], tipo: "+", data: "01/01/2001"}
]

const vendas = [
    {receita: "R$ 11,11", un: 10, data: "01/01/2001"},
    {receita: "R$ 11,11", un: 10, data: "01/01/2001"},
    {receita: "R$ 11,11", un: 10, data: "01/01/2001"}
]
const acessos = [
    {hora: "17:30", data: "01/01/2001"},
    {hora: "17:30", data: "01/01/2001"},
    {hora: "17:30", data: "01/01/2001"}
]

//(+) aquisição / (-) venda

const Log = () => {
    const [filtro, setFiltro] = useState(1);

    return (<> <Header gestao /> <main className="page"><div className="page-heading"><div><span className="eyebrow">REGISTROS</span><h1>Log</h1><p>Tabela de ultimos 10 registros</p></div></div>
    <section className="log-filtro"> <button className='on' id='log-btn' onClick={(e) => { escolherFiltro(e); setFiltro(1); }}>Acessos</button> <button id='log-btn' onClick={(e) => { escolherFiltro(e); setFiltro(2); }}>Vendas</button> <button id='log-btn' onClick={(e) => { escolherFiltro(e); setFiltro(3); }}>Livros</button> </section>
    <section className='panel table-panel'> 
        {filtro === 1 && (<table> <thead> <tr> <th>Operador</th> <th>Hora</th> <th>Data</th> </tr></thead> <tbody> {acessos.map((a) => <tr key={a}> <td>placeholder</td> <td>{a.hora}</td> <td>{a.data}</td></tr>)} </tbody> </table>)}
        {filtro === 3 && (<table> <thead> <tr> <th>Operador</th> <th>Livros</th> <th>Tipo</th> <th>Data</th> </tr></thead> <tbody> {registros.map((r) => <tr key={r}> <td>placeholder</td>
        <td style={{ whiteSpace: "pre-line" }}>{Array.isArray(r.livro) ? r.livro.join("\n") : r.livro}</td>
        <td>{r.tipo ? "+" && "(+) adicionado" : "(-) diminuida"}</td> <td>{r.data}</td> </tr>)} </tbody> </table>)}
        {filtro === 2 && (<table> <thead> <tr> <th>Operador</th> <th>Valor</th> <th>Quantidade</th> <th>Data</th> </tr></thead> <tbody> {vendas.map((v) => <tr key={v}> <td>placeholder</td> <td>{v.receita}</td> <td>{Number.parseInt(v.un)}</td> <td>{v.data}</td> </tr>)} </tbody> </table>)}
    </section>

    </main></>)
}

export default Log;