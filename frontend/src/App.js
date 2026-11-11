import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Livros from './paginas/Livros';
import Dashboard from './paginas/Dashboard';
import Clientes from './paginas/Clientes';
import CadastroLivro from './paginas/CadastroLivro';
import EditarLivro from './paginas/EditarLivro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Livros />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/livros/novo" element={<CadastroLivro />} />
        <Route path="/livros/:id/editar" element={<EditarLivro />} />
        <Route path="*" element={<Navigate to="/livros" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
