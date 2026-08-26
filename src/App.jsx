import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import DashboardEstudante from "./pages/DashboardEstudante"
import EscolhaSetor from "./pages/EscolhaSetor"
import GeracaoSenha from "./pages/GeracaoSenha"
import SenhaGerada from "./pages/SenhaGerada"
import AcompanhamentoFila from "./pages/AcompanhamentoFila"
import HistoricoAtendimentos from "./pages/HistoricoAtendimentos"
import PainelServidor from "./pages/PainelServidor"
import VisualizacaoFila from "./pages/VisualizacaoFila"
import PainelAdministrativo from "./pages/PainelAdministrativo"
import GerenciamentoUsuarios from "./pages/GerenciamentoUsuarios"
import GerenciamentoSetores from "./pages/GerenciamentoSetores"
import Relatorios from "./pages/Relatorios"
import FiltroRelatorios from "./pages/FiltroRelatorios"
import VisualizacaoDados from "./pages/VisualizacaoDados"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/estudante"
          element={<DashboardEstudante />}
        />

        <Route
          path="/setores"
          element={<EscolhaSetor />}
        />

        <Route
          path="/gerar-senha"
          element={<GeracaoSenha />}
        />

        <Route
          path="/senha-gerada"
          element={<SenhaGerada />}
        />

        <Route
          path="/acompanhar-fila"
          element={<AcompanhamentoFila />}
        />

        <Route
          path="/historico"
          element={<HistoricoAtendimentos />}
        />

        <Route
          path="/servidor"
          element={<PainelServidor />}
        />

        <Route
          path="/fila"
          element={<VisualizacaoFila />}
        />

        <Route
          path="/administrador"
          element={<PainelAdministrativo />}
        />

        <Route
          path="/usuarios"
          element={<GerenciamentoUsuarios />}
        />

        <Route
          path="/setores-admin"
          element={<GerenciamentoSetores />}
        />

        <Route
          path="/relatorios"
          element={<Relatorios />}
        />

        <Route
          path="/filtros-relatorios"
          element={<FiltroRelatorios />}
        />

        <Route
          path="/dados"
          element={<VisualizacaoDados />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App