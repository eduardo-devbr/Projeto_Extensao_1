import os
import sqlite3


NOME_BANCO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "livros.db")



def conectar():
    banco = sqlite3.connect(NOME_BANCO)
    banco.row_factory = sqlite3.Row  
    return banco



def criar_tabela():
    banco = conectar()
    banco.execute("""
        CREATE TABLE IF NOT EXISTS Livro (
            id                 INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo             TEXT,
            autor              TEXT,
            genero             TEXT,
            preco              REAL,
            quantidade         INTEGER,
            edicao             TEXT,
            estado_conservacao TEXT,
            sinopse            TEXT,
            localizacao        TEXT
        )
    """)
    # Migração: adicionar colunas caso a tabela já exista no formato antigo
    for coluna in ['edicao', 'estado_conservacao', 'sinopse', 'localizacao']:
        try:
            banco.execute(f"ALTER TABLE Livro ADD COLUMN {coluna} TEXT")
        except Exception:
            pass  # coluna já existe
    banco.commit()
    banco.close()


#crud
def listar_livros():
    banco = conectar()
    linhas = banco.execute("SELECT * FROM Livro").fetchall()
    banco.close()
    return [dict(linha) for linha in linhas]


def criar_livro(titulo, autor, genero, preco, quantidade,
                edicao='', estado_conservacao='', sinopse='', localizacao=''):
    banco = conectar()
    banco.execute(
        """INSERT INTO Livro
           (titulo, autor, genero, preco, quantidade, edicao, estado_conservacao, sinopse, localizacao)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (titulo, autor, genero, preco, quantidade, edicao, estado_conservacao, sinopse, localizacao),
    )
    banco.commit()
    banco.close()


def atualizar_livro(id_livro, titulo, autor, genero, preco, quantidade,
                    edicao='', estado_conservacao='', sinopse='', localizacao=''):
    banco = conectar()
    banco.execute(
        """UPDATE Livro
           SET titulo = ?, autor = ?, genero = ?, preco = ?, quantidade = ?,
               edicao = ?, estado_conservacao = ?, sinopse = ?, localizacao = ?
           WHERE id = ?""",
        (titulo, autor, genero, preco, quantidade, edicao, estado_conservacao, sinopse, localizacao, id_livro),
    )
    banco.commit()
    banco.close()


def remover_livro(id_livro):
    banco = conectar()
    banco.execute("DELETE FROM Livro WHERE id = ?", (id_livro,))
    banco.commit()
    banco.close()


#teste no terminal
if __name__ == "__main__":
    criar_tabela()

    print("1. Criando um livro de teste...")
    criar_livro("O Iluminado", "Stephen King", "Terror", 59.90, 3,
                "2ª edição", "Seminovo", "Um escritor e sua família se mudam para um hotel isolado...", "Estante B, Prateleira 2")

    print("2. Listando:")
    livros = listar_livros()
    for livro in livros:
        print("  ", livro)

    id_teste = livros[-1]["id"]

    print(f"3. Atualizando o livro {id_teste}...")
    atualizar_livro(id_teste, "O Iluminado", "Stephen King", "Terror", 45.00, 2,
                    "2ª edição", "Usado", "Um escritor e sua família se mudam para um hotel isolado...", "Estante B, Prateleira 2")
    print("  ", listar_livros()[-1])

    print(f"4. Removendo o livro {id_teste}...")
    remover_livro(id_teste)
    print("5. Lista final:", listar_livros())
