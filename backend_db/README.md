# Projeto PEX1 — Sebo do Cesar

POC acadêmica demonstrando React, React Router, Flask, API REST e SQLite.

## Telas

- Catálogo de Livros (base original)
- Dashboard
- Clientes
- Cadastro de Livro

## Como executar

### Backend

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

API: http://localhost:5000

### Frontend

Abra outro terminal na pasta `frontend`:

```powershell
npm install
npm start
```

Frontend: http://localhost:3000

O cadastro de livros usa a API Flask e grava no SQLite.
