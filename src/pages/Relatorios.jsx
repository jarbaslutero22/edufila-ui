import { useEffect, useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

function Relatorios() {
  const [atendimentos, setAtendimentos] = useState([])
  const [setores, setSetores] = useState([])

  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [setorFiltro, setSetorFiltro] = useState("todos")

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true)
        setErro("")

        const [dadosRelatorios, dadosSetores] =
          await Promise.all([
            apiFetch("/api/relatorios"),
            apiFetch("/api/setores"),
          ])

        setAtendimentos(dadosRelatorios.atendimentos || [])
        setSetores(dadosSetores.setores || [])
      } catch (error) {
        setErro(
          error.message ||
            "Não foi possível carregar os dados dos relatórios."
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [])

  function obterNomeSetor(setorId) {
    const setor = setores.find(
      (item) => Number(item.id) === Number(setorId)
    )

    return setor?.nome || `Setor ${setorId}`
  }

  function calcularTempoEspera(atendimento) {
    if (
      !atendimento.horarioEntrada ||
      !atendimento.horarioChamada
    ) {
      return 0
    }

    const entrada = new Date(atendimento.horarioEntrada)
    const chamada = new Date(atendimento.horarioChamada)

    return (chamada - entrada) / 60000
  }

  function formatarMinutos(valor) {
    if (!Number.isFinite(valor)) {
      return "0 min"
    }

    return `${Math.round(valor)} min`
  }

  function estaNoPeriodo(atendimento) {
    if (!atendimento.horarioEntrada) {
      return false
    }

    const data = new Date(atendimento.horarioEntrada)

    if (dataInicial) {
      const inicio = new Date(`${dataInicial}T00:00:00`)

      if (data < inicio) {
        return false
      }
    }

    if (dataFinal) {
      const fim = new Date(`${dataFinal}T23:59:59`)

      if (data > fim) {
        return false
      }
    }

    return true
  }

  const atendimentosFiltrados = atendimentos.filter(
    (atendimento) => {
      const correspondeAoSetor =
        setorFiltro === "todos" ||
        String(atendimento.setorId) === setorFiltro

      return (
        correspondeAoSetor &&
        estaNoPeriodo(atendimento)
      )
    }
  )

  const totalAtendimentos = atendimentosFiltrados.length

  const atendimentosConcluidos =
    atendimentosFiltrados.filter(
      (item) => item.status === "finalizado"
    ).length

  const atendimentosPrioritarios =
    atendimentosFiltrados.filter(
      (item) => item.prioridade === true
    ).length

  const atendimentosNormais =
    totalAtendimentos - atendimentosPrioritarios

  const atendimentosCancelados =
    atendimentosFiltrados.filter(
      (item) => item.status === "cancelado"
    ).length

  const temposEspera = atendimentosFiltrados
    .map(calcularTempoEspera)
    .filter((tempo) => Number.isFinite(tempo))

  const tempoMedioEspera =
    temposEspera.length > 0
      ? temposEspera.reduce(
          (total, tempo) => total + tempo,
          0
        ) / temposEspera.length
      : 0

  const setoresResumo = setores
    .map((setor) => {
      const registros = atendimentosFiltrados.filter(
        (item) =>
          Number(item.setorId) === Number(setor.id)
      )

      const tempos = registros
        .map(calcularTempoEspera)
        .filter((tempo) => Number.isFinite(tempo))

      const media =
        tempos.length > 0
          ? tempos.reduce(
              (total, tempo) => total + tempo,
              0
            ) / tempos.length
          : 0

      return {
        id: setor.id,
        setor: setor.nome,
        atendimentos: registros.length,
        espera: formatarMinutos(media),
      }
    })
    .filter((item) => item.atendimentos > 0)
    .sort(
      (a, b) =>
        b.atendimentos - a.atendimentos
    )

  const setorComMaisAtendimentos =
    setoresResumo.length > 0
      ? setoresResumo[0].setor
      : "Nenhum"

  function limparFiltros() {
    setDataInicial("")
    setDataFinal("")
    setSetorFiltro("todos")
  }

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
            <strong>Servidor</strong>
            <span>Relatórios de atendimento</span>
          </div>

          <div className="user-avatar">S</div>
        </div>
      </header>

      <section className="reports-container">
        <button className="back-button" type="button">
          ← Voltar ao painel
        </button>

        <div className="reports-heading">
          <div>
            <p className="eyebrow-dashboard">
              RELATÓRIOS
            </p>

            <h1>Relatórios de atendimento</h1>

            <p>
              Consulte informações resumidas sobre os
              atendimentos realizados no EduFila.
            </p>
          </div>
        </div>

        {erro && (
          <div className="geracao-warning">
            <div className="notice-icon">!</div>

            <div>
              <strong>
                Não foi possível carregar os relatórios
              </strong>

              <p>{erro}</p>
            </div>
          </div>
        )}

        <section className="reports-filters">
          <div className="field-group">
            <label htmlFor="periodo-inicial">
              Data inicial
            </label>

            <input
              id="periodo-inicial"
              type="date"
              value={dataInicial}
              onChange={(event) =>
                setDataInicial(event.target.value)
              }
            />
          </div>

          <div className="field-group">
            <label htmlFor="periodo-final">
              Data final
            </label>

            <input
              id="periodo-final"
              type="date"
              value={dataFinal}
              onChange={(event) =>
                setDataFinal(event.target.value)
              }
            />
          </div>

          <div className="field-group">
            <label htmlFor="relatorio-setor">
              Setor
            </label>

            <select
              id="relatorio-setor"
              value={setorFiltro}
              onChange={(event) =>
                setSetorFiltro(event.target.value)
              }
            >
              <option value="todos">
                Todos os setores
              </option>

              {setores.map((setor) => (
                <option
                  key={setor.id}
                  value={setor.id}
                >
                  {setor.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            className="dashboard-primary-button"
            type="button"
            disabled={carregando}
          >
            {carregando
              ? "Carregando..."
              : "Gerar relatório"}
          </button>

          <button
            className="back-button"
            type="button"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
        </section>

        {carregando ? (
          <div className="historico-info">
            <div className="notice-icon">...</div>

            <p>
              Carregando dados dos relatórios...
            </p>
          </div>
        ) : (
          <>
            <section className="reports-summary">
              <article className="info-card">
                <span className="card-label">
                  Atendimentos no período
                </span>

                <strong>
                  {totalAtendimentos}
                </strong>

                <p>
                  Total de atendimentos registrados.
                </p>
              </article>

              <article className="info-card">
                <span className="card-label">
                  Tempo médio de espera
                </span>

                <strong>
                  {formatarMinutos(
                    tempoMedioEspera
                  )}
                </strong>

                <p>
                  Média calculada pelos horários registrados.
                </p>
              </article>

              <article className="info-card">
                <span className="card-label">
                  Setor com mais atendimentos
                </span>

                <strong>
                  {setorComMaisAtendimentos}
                </strong>

                <p>
                  Setor com maior volume no período.
                </p>
              </article>

              <article className="info-card">
                <span className="card-label">
                  Atendimentos concluídos
                </span>

                <strong>
                  {atendimentosConcluidos}
                </strong>

                <p>
                  Atendimentos finalizados.
                </p>
              </article>
            </section>

            <section className="reports-grid">
              <article className="reports-panel">
                <div>
                  <p className="panel-overline">
                    ATENDIMENTOS POR SETOR
                  </p>

                  <h2>Resumo dos setores</h2>
                </div>

                {setoresResumo.length === 0 ? (
                  <div className="historico-info">
                    <div className="notice-icon">i</div>

                    <p>
                      Nenhum atendimento encontrado
                      para os filtros selecionados.
                    </p>
                  </div>
                ) : (
                  <div className="reports-sector-list">
                    {setoresResumo.map((item) => (
                      <div
                        className="reports-sector-item"
                        key={item.id}
                      >
                        <div>
                          <strong>
                            {item.setor}
                          </strong>

                          <span>
                            {item.atendimentos}{" "}
                            {item.atendimentos === 1
                              ? "atendimento"
                              : "atendimentos"}
                          </span>
                        </div>

                        <div className="reports-sector-metrics">
                          <span>
                            Tempo médio
                          </span>

                          <strong>
                            {item.espera}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <aside className="reports-panel reports-side">
                <p className="panel-overline">
                  INDICADORES
                </p>

                <h2>Resumo do período</h2>

                <div className="reports-indicators">
                  <div>
                    <span>
                      Atendimentos registrados
                    </span>

                    <strong>
                      {totalAtendimentos}
                    </strong>
                  </div>

                  <div>
                    <span>Concluídos</span>

                    <strong>
                      {atendimentosConcluidos}
                    </strong>
                  </div>

                  <div>
                    <span>Prioritários</span>

                    <strong>
                      {atendimentosPrioritarios}
                    </strong>
                  </div>

                  <div>
                    <span>Normais</span>

                    <strong>
                      {atendimentosNormais}
                    </strong>
                  </div>

                  <div>
                    <span>Cancelados</span>

                    <strong>
                      {atendimentosCancelados}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Tempo médio geral
                    </span>

                    <strong>
                      {formatarMinutos(
                        tempoMedioEspera
                      )}
                    </strong>
                  </div>
                </div>
              </aside>
            </section>

            <section className="reports-table-card">
              <div className="reports-table-heading">
                <div>
                  <p className="panel-overline">
                    DETALHAMENTO
                  </p>

                  <h2>
                    Atendimentos por setor
                  </h2>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Setor</th>
                      <th>Atendimentos</th>
                      <th>
                        Tempo médio de espera
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {setoresResumo.length === 0 ? (
                      <tr>
                        <td colSpan="3">
                          Nenhum atendimento encontrado.
                        </td>
                      </tr>
                    ) : (
                      setoresResumo.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>
                              {item.setor}
                            </strong>
                          </td>

                          <td>
                            {item.atendimentos}
                          </td>

                          <td>
                            {item.espera}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="historico-info">
              <div className="notice-icon">i</div>

              <p>
                Os dados apresentados são carregados
                diretamente da API do EduFila. Os filtros
                de período e setor são aplicados sobre os
                atendimentos retornados pelo sistema.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Relatorios
