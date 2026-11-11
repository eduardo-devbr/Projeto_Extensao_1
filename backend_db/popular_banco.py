
from database import criar_tabela, criar_livro, listar_livros

livros = [
    ("O Iluminado", "Stephen King", "Terror", 59.90, 3),
    ("Jantar Secreto", "Raphael Montes", "Suspense/Terror", 45.00, 5),
    ("Laranja Mecânica", "Anthony Burgess", "Ficção/Cult", 35.50, 2),
    ("Clube da Luta", "Chuck Palahniuk", "Ficção/Cult", 49.90, 4),
    ("Dias Perfeitos", "Raphael Montes", "Suspense", 30.00, 1),
    ("Assim Falou Zaratustra", "Friedrich Nietzsche", "Filosofia", 20.00, 3),
    ("It: A Coisa", "Stephen King", "Terror", 89.90, 2),
    ("O Exorcista", "William Peter Blatty", "Terror", 25.00, 1),
    ("O Mito de Sísifo", "Albert Camus", "Filosofia", 42.00, 2),
    ("Androides Sonham com Ovelhas Elétricas?", "Philip K. Dick", "Ficção Científica", 55.00, 3),
]

if __name__ == "__main__":
    criar_tabela()
    for livro in livros:
        criar_livro(*livro)
    print("Livros cadastrados:")
    for l in listar_livros():
        print(f"{l['id']} | {l['titulo']} - {l['autor']} | R$ {l['preco']:.2f} | Estoque: {l['quantidade']}")
