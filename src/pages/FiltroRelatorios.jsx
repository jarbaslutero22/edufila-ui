import { useState } from "react"
import "../App.css"

function FiltroRelatorios() {
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [setor, setSetor] = useState("todos")
  const [status, setStatus] = useState("todos")
  const [periodoRapido, setPeriodoRapido] = useState("")

  function aplicarPeriodoRapido(periodo) {
    setPeriodoRapido(periodo)

    const hoje = new Date()
    const inicio = new Date()

    if (periodo === "7") {
      inicio.setDate(hoje.getDate() - 7)
    }

    if (periodo === "30") {
      inicio.setDate(hoje.getDate() - 30)
    }

    if (periodo === "90") {
      inicio.setDate(hoje.getDate() - 90)
    }

    const formatarData = (data) =>
      data.toISOString().split("T")[0]

    setDataInicial(formatarData(inicio))
    setDataFinal(formatarData(hoje))
  }

  function limparFiltros() {
    setDataInicial("")
    setDataFinal("")
    setSetor("todos")
    setStatus("todos")
    setPeriodoRapido("")
  }

  function gerarRelatorio(event) {
    event.preventDefault()

    if (
      dataInicial &&
      dataFinal &&
      dataInicial > dataFinal
    ) {
      alert(
        "A data inicial não pode ser maior que a data final."
      )
      return
    }

    alert("Filtros aplicados com sucesso.")
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

      <section className="filter-reports-container">
        <button className="back-button" type="button">
          ← Voltar aos relatórios
        </button>

        <div className="filter-reports-heading">
          <p className="eyebrow-dashboard">
            RELATÓRIOS
          </p>

          <h1>Filtrar relatórios</h1>

          <p>
            Defina os critérios para consultar os
            atendimentos registrados no EduFila.
          </p>
        </div>

        <section className="quick-period-card">
          <div>
            <p className="panel-overline">
              PERÍODO RÁPIDO
            </p>

            <h2>Escolha um intervalo</h2>
          </div>

          <div className="quick-period-buttons">
            <button
              className={
                periodoRapido === "7"
                  ? "quick-filter active"
                  : "quick-filter"
              }
              type="button"
              onClick={() =>
                aplicarPeriodoRapido("7")
              }
            >
              Últimos 7 dias
            </button>

            <button
              className={
                periodoRapido === "30"
                  ? "quick-filter active"
                  : "quick-filter"
              }
              type="button"
              onClick={() =>
                aplicarPeriodoRapido("30")
              }
            >
              Últimos 30 dias
            </button>

            <button
              className={
                periodoRapido === "90"
                  ? "quick-filter active"
                  : "quick-filter"
              }
              type="button"
              onClick={() =>
                aplicarPeriodoRapido("90")
              }
            >
              Últimos 90 dias
            </button>
          </div>
        </section>

        <form
          className="filter-reports-card"
          onSubmit={gerarRelatorio}
        >
          <div className="filter-reports-section">
            <div>
              <p className="panel-overline">
                PERÍODO
              </p>

              <h2>Intervalo de datas</h2>
            </div>

            <div className="filter-date-grid">
              <div className="field-group">
                <label htmlFor="filtro-data-inicial">
                  Data inicial
                </label>

                <input
                  id="filtro-data-inicial"
                  type="date"
                  value={dataInicial}
                  onChange={(event) => {
                    setDataInicial(event.target.value)
                    setPeriodoRapido("")
                  }}
                />
              </div>

              <div className="field-group">
                <label htmlFor="filtro-data-final">
                  Data final
                </label>

                <input
                  id="filtro-data-final"
                  type="date"
                  value={dataFinal}
                  onChange={(event) => {
                    setDataFinal(event.target.value)
                    setPeriodoRapido("")
                  }}
                />
              </div>
            </div>
          </div>

          <div className="filter-divider"></div>

          <div className="filter-reports-section">
            <div>
              <p className="panel-overline">
                ATENDIMENTO
              </p>

              <h2>Critérios do relatório</h2>
            </div>

            <div className="filter-select-grid">
              <div className="field-group">
                <label htmlFor="filtro-setor">
                  Setor
                </label>

                <select
                  id="filtro-setor"
                  value={setor}
                  onChange={(event) =>
                    setSetor(event.target.value)
                  }
                >
                  <option value="todos">
                    Todos os setores
                  </option>

                  <option value="secretaria">
                    Secretaria Acadêmica
                  </option>

                  <option value="coordenacao">
                    Coordenação do Curso
                  </option>

                  <option value="atendimento">
                    Atendimento ao Estudante
                  </option>

                  <option value="administrativo">
                    Setor Administrativo
                  </option>
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="filtro-status">
                  Status
                </label>

                <select
                  id="filtro-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                >
                  <option value="todos">
                    Todos os status
                  </option>

                  <option value="concluido">
                    Concluído
                  </option>

                  <option value="cancelado">
                    Cancelado
                  </option>

                  <option value="adiado">
                    Adiado
                  </option>
                </select>
              </div>
            </div>
          </div>

          <section className="filter-summary">
            <p className="panel-overline">
              RESUMO DOS FILTROS
            </p>

            <div className="filter-summary-grid">
              <div>
                <span>Data inicial</span>
                <strong>
                  {dataInicial || "Não definida"}
                </strong>
              </div>

              <div>
                <span>Data final</span>
                <strong>
                  {dataFinal || "Não definida"}
                </strong>
              </div>

              <div>
                <span>Setor</span>
                <strong>
                  {setor === "todos"
                    ? "Todos"
                    : setor}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {status === "todos"
                    ? "Todos"
                    : status}
                </strong>
              </div>
            </div>
          </section>

          <div className="filter-actions">
            <button
              className="secondary-action"
              type="button"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>

            <button
              className="dashboard-primary-button"
              type="submit"
            >
              Aplicar filtros
            </button>
          </div>
        </form>

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            Os filtros permitem selecionar o período,
            setor e status dos atendimentos que serão
            considerados no relatório.
          </p>
        </div>
      </section>
    </main>
  )
}

export default FiltroRelatorios