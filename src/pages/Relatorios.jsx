import "../App.css"

function Relatorios() {
  const resumo = [
    {
      titulo: "Atendimentos no período",
      valor: "128",
      descricao: "Total de atendimentos registrados.",
    },
    {
      titulo: "Tempo médio de espera",
      valor: "11 min",
      descricao: "Média estimada no período.",
    },
    {
      titulo: "Setor com mais atendimentos",
      valor: "Secretaria",
      descricao: "Setor com maior volume.",
    },
    {
      titulo: "Atendimentos concluídos",
      valor: "119",
      descricao: "Atendimentos finalizados.",
    },
  ]

  const setores = [
    {
      setor: "Secretaria Acadêmica",
      atendimentos: 52,
      espera: "10 min",
    },
    {
      setor: "Coordenação do Curso",
      atendimentos: 31,
      espera: "8 min",
    },
    {
      setor: "Atendimento ao Estudante",
      atendimentos: 27,
      espera: "13 min",
    },
    {
      setor: "Setor Administrativo",
      atendimentos: 18,
      espera: "14 min",
    },
  ]

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
              Consulte informações resumidas sobre os atendimentos
              realizados no EduFila.
            </p>
          </div>
        </div>

        <section className="reports-filters">
          <div className="field-group">
            <label htmlFor="periodo-inicial">
              Data inicial
            </label>

            <input
              id="periodo-inicial"
              type="date"
            />
          </div>

          <div className="field-group">
            <label htmlFor="periodo-final">
              Data final
            </label>

            <input
              id="periodo-final"
              type="date"
            />
          </div>

          <div className="field-group">
            <label htmlFor="relatorio-setor">
              Setor
            </label>

            <select
              id="relatorio-setor"
              defaultValue="todos"
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

          <button
            className="dashboard-primary-button"
            type="button"
          >
            Gerar relatório
          </button>
        </section>

        <section className="reports-summary">
          {resumo.map((item) => (
            <article
              className="info-card"
              key={item.titulo}
            >
              <span className="card-label">
                {item.titulo}
              </span>

              <strong>{item.valor}</strong>

              <p>{item.descricao}</p>
            </article>
          ))}
        </section>

        <section className="reports-grid">
          <article className="reports-panel">
            <div>
              <p className="panel-overline">
                ATENDIMENTOS POR SETOR
              </p>

              <h2>Resumo dos setores</h2>
            </div>

            <div className="reports-sector-list">
              {setores.map((item) => (
                <div
                  className="reports-sector-item"
                  key={item.setor}
                >
                  <div>
                    <strong>{item.setor}</strong>

                    <span>
                      {item.atendimentos} atendimentos
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
          </article>

          <aside className="reports-panel reports-side">
            <p className="panel-overline">
              INDICADORES
            </p>

            <h2>Resumo do período</h2>

            <div className="reports-indicators">
              <div>
                <span>Atendimentos registrados</span>
                <strong>128</strong>
              </div>

              <div>
                <span>Concluídos</span>
                <strong>119</strong>
              </div>

              <div>
                <span>Cancelados</span>
                <strong>9</strong>
              </div>

              <div>
                <span>Tempo médio geral</span>
                <strong>11 min</strong>
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

              <h2>Atendimentos por setor</h2>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Setor</th>
                  <th>Atendimentos</th>
                  <th>Tempo médio de espera</th>
                </tr>
              </thead>

              <tbody>
                {setores.map((item) => (
                  <tr key={item.setor}>
                    <td>
                      <strong>{item.setor}</strong>
                    </td>

                    <td>{item.atendimentos}</td>

                    <td>{item.espera}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            Os relatórios apresentados possuem caráter informativo
            e resumem dados básicos dos atendimentos registrados
            no sistema.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Relatorios