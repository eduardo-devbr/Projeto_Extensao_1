from flask import Flask, jsonify, request
from flask_cors import CORS

from database import (
    criar_tabela,
    listar_livros,
    criar_livro,
    atualizar_livro,
    remover_livro,
    listar_clientes,
    criar_cliente,
    atualizar_cliente,
)


app = Flask(__name__)
CORS(app)  

criar_tabela()


@app.get("/livros")
def rota_listar():
    return jsonify(listar_livros())


@app.post("/livros")
def rota_criar():
    dados = request.get_json()
    criar_livro(
        dados["titulo"],
        dados["autor"],
        dados["genero"],
        dados["preco"],
        dados["quantidade"],
        dados.get("edicao", ""),
        dados.get("estado_conservacao", ""),
        dados.get("sinopse", ""),
        dados.get("localizacao", ""),
        dados.get("imagem", ""),
    )
    return jsonify({"mensagem": "Livro criado"})


@app.put("/livros/<int:id>")
def rota_editar(id):
    dados = request.get_json()
    atualizar_livro(
        id,
        dados["titulo"],
        dados["autor"],
        dados["genero"],
        dados["preco"],
        dados["quantidade"],
        dados.get("edicao", ""),
        dados.get("estado_conservacao", ""),
        dados.get("sinopse", ""),
        dados.get("localizacao", ""),
        dados.get("imagem", ""),
    )
    return jsonify({"mensagem": "Livro atualizado"})


@app.delete("/livros/<int:id>")
def rota_remover(id):
    remover_livro(id)
    return jsonify({"mensagem": "Livro removido"})


@app.get("/clientes")
def rota_listar_clientes():
    return jsonify(listar_clientes())


@app.post("/clientes")
def rota_criar_cliente():
    dados = request.get_json()
    criar_cliente(dados["nome"], dados.get("email", ""), dados.get("telefone", ""))
    return jsonify({"mensagem": "Cliente criado"})


@app.put("/clientes/<int:id>")
def rota_editar_cliente(id):
    dados = request.get_json()
    atualizar_cliente(id, dados["nome"], dados.get("email", ""), dados.get("telefone", ""))
    return jsonify({"mensagem": "Cliente atualizado"})


if __name__ == "__main__":
    app.run(debug=True)  # http://localhost:5000
