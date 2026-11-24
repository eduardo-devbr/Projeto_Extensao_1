const API_URL = 'http://localhost:5000';

export async function listarLivros() {
  const resposta = await fetch(`${API_URL}/livros`);
  if (!resposta.ok) throw new Error('Não foi possível carregar os livros.');
  return resposta.json();
}

export async function buscarLivro(id) {
  const livros = await listarLivros();
  const livro = livros.find((l) => l.id === Number(id));
  if (!livro) throw new Error('Livro não encontrado.');
  return livro;
}

export async function criarLivro(livro) {
  const resposta = await fetch(`${API_URL}/livros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro),
  });
  if (!resposta.ok) throw new Error('Não foi possível cadastrar o livro.');
  return resposta.json();
}

export async function atualizarLivro(id, livro) {
  const resposta = await fetch(`${API_URL}/livros/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro),
  });
  if (!resposta.ok) throw new Error('Não foi possível atualizar o livro.');
  return resposta.json();
}

export async function removerLivro(id) {
  const resposta = await fetch(`${API_URL}/livros/${id}`, { method: 'DELETE' });
  if (!resposta.ok) throw new Error('Não foi possível remover o livro.');
  return resposta.json();
}

export async function listarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);
  if (!resposta.ok) throw new Error('Não foi possível carregar os clientes.');
  return resposta.json();
}

export async function buscarCliente(id) {
  const clientes = await listarClientes();
  const cliente = clientes.find((c) => c.id === Number(id));
  if (!cliente) throw new Error('Cliente não encontrado.');
  return cliente;
}

export async function criarCliente(cliente) {
  const resposta = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!resposta.ok) throw new Error('Não foi possível cadastrar o cliente.');
  return resposta.json();
}

export async function atualizarCliente(id, cliente) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!resposta.ok) throw new Error('Não foi possível atualizar o cliente.');
  return resposta.json();
}
