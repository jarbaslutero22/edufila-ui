import { useEffect, useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

function HistoricoAtendimentos() {
  const [atendimentos, setAtendimentos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  const [setorFiltro, setSetorFiltro] = useState("todos")
  const [periodoFiltro, setPeriodoFiltro] = useState("todos")

  useEffect(() => {
    async function carregarHistorico() {
      try {
        setCarregando(true)
        setErro("")

        const dados = await apiFetch("/api/fila/historico/listar")

        setAtendimentos(dados.historico || [])
      } catch (error) {
        setErro(
          error.message ||
          "Não foi possível carregar o histórico de atendimentos."
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarHistorico()
  }, [])

  function formatarData(dataHora) {
    if (!dataHora) return "-"

    const data = new Date(dataHora)

    return data.toLocaleDateString("pt-BR")
  }

  function formatarHorario(dataHora) {
    if (!dataHora) return "-"

    const data = new Date(dataHora)

    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function obterNomeSetor(setorId) {
    const setores = {
      1: "Secretaria Acadêmica",
      2: "Coordenação do Curso",
      3: "Atendimento ao Estudante",
      4: "Setor Administrativo",
      5: "Biblioteca Central",
    }

    return setores[setorId] || `Setor ${setorId}`
  }

  function filtrarPorPeriodo(atendimento) {
    if (periodoFiltro === "todos") {
      return true
    }

    if (!atendimento.horarioFinalizacao) {
      return false
    }

    const dataAtendimento = new Date(atendimento.horarioFinalizacao)
    const agora = new Date()

    if (periodoFiltro === "30") {
      const limite = new Date()
      limite.setDate(agora.getDate() - 30)

      return dataAtendimento >= limite
    }

    if (periodoFiltro === "90") {
      const limite = new Date()
      limite.setDate(agora.getDate() - 90)

      return dataAtendimento >= limite
    }

    if (periodoFiltro === "ano") {
      return dataAtendimento.getFullYear() === agora.getFullYear()
    }

    return true
  }

  const atendimentosFiltrados = atendimentos.filter((atendimento) => {
    const setorCorresponde =
      setorFiltro === "todos" ||
      String(atendimento.setorId) === setorFiltro

    const periodoCorresponde = filtrarPorPeriodo(atendimento)

    return setorCorresponde && periodoCorresponde
  })

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-badge-small">EF</div>

          <div>
            <strong>EduFila</strong>
            <span>Atendimento acadêmico</span>
          </div>
        </div>

        <div className="dashboard-user">
          <div>
            <strong>Estudante</strong>
            <span>Perfil acadêmico</span>
          </div>

          <div className="user-avatar">E</div>
        </div>
      </header>

      <section className="historico-container">
        <button className="back-button" type="button">
          ← Voltar ao painel
        </button>

        <div className="historico-header">
          <div>
            <p className="eyebrow-dashboard">MEUS ATENDIMENTOS</p>
            <h1>Histórico de atendimentos</h1>
            <p>
              Consulte os atendimentos acadêmicos realizados anteriormente.
            </p>
          </div>

          <div className="historico-total">
            <span>Total de atendimentos</span>
            <strong>{atendimentosFiltrados.length}</strong>
          </div>
        </div>

        {erro && (
          <div className="geracao-warning">
            <div className="notice-icon">!</div>

            <div>
              <strong>Não foi possível carregar o histórico</strong>
              <p>{erro}</p>
            </div>
          </div>
        )}

        <section className="historico-filtros">
          <div className="field-group">
            <label htmlFor="setor-historico">Setor</label>

            <select
              id="setor-historico"
              value={setorFiltro}
              onChange={(event) => setSetorFiltro(event.target.value)}
            >
              <option value="todos">Todos os setores</option>
              <option value="1">Secretaria Acadêmica</option>
              <option value="2">Coordenação do Curso</option>
              <option value="3">Atendimento ao Estudante</option>
              <option value="4">Setor Administrativo</option>
              <option value="5">Biblioteca Central</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="periodo-historico">Período</label>

            <select
              id="periodo-historico"
              value={periodoFiltro}
              onChange={(event) => setPeriodoFiltro(event.target.value)}
            >
              <option value="todos">Todo o período</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="ano">Este ano</option>
            </select>
          </div>
        </section>

        {carregando ? (
          <section className="historico-lista">
            <div className="historico-info">
              <div className="notice-icon">...</div>

              <p>Carregando histórico de atendimentos...</p>
            </div>
          </section>
        ) : atendimentosFiltrados.length === 0 ? (
          <section className="historico-lista">
            <div className="historico-info">
              <div className="notice-icon">i</div>

              <p>
                Nenhum atendimento encontrado para os filtros selecionados.
              </p>
            </div>
          </section>
        ) : (
          <section className="historico-lista">
            {atendimentosFiltrados.map((atendimento) => (
              <article
                className="historico-card"
                key={`${atendimento.codigo}-${atendimento.horarioFinalizacao}`}
              >
                <div className="historico-data">
                  <span>
                    {formatarData(atendimento.horarioFinalizacao)}
                  </span>

                  <small>
                    {formatarHorario(atendimento.horarioFinalizacao)}
                  </small>
                </div>

                <div className="historico-principal">
                  <div>
                    <span className="historico-label">Setor</span>

                    <strong>
                      {obterNomeSetor(atendimento.setorId)}
                    </strong>
                  </div>

                  <p>Atendimento acadêmico</p>
                </div>

                <div className="historico-senha">
                  <span>Senha</span>
                  <strong>{atendimento.codigo}</strong>
                </div>

                <div className="historico-status">
                  <span className="status-concluido">
                    ✓ Concluído
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            Os atendimentos concluídos são registrados automaticamente no
            histórico do EduFila.
          </p>
        </div>
      </section>
    </main>
  )
}

export default HistoricoAtendimentos
