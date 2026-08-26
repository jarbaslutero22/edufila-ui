import "../App.css"

function VisualizacaoDados() {
  const setores = [
    {
      nome: "Secretaria Acadêmica",
      atendimentos: 52,
      percentual: 100,
      espera: "10 min",
    },
    {
      nome: "Coordenação do Curso",
      atendimentos: 31,
      percentual: 60,
      espera: "8 min",
    },
    {
      nome: "Atendimento ao Estudante",
      atendimentos: 27,
      percentual: 52,
      espera: "13 min",
    },
    {
      nome: "Setor Administrativo",
      atendimentos: 18,
      percentual: 35,
      espera: "14 min",
    },
  ]

  const dias = [
    { dia: "Seg", quantidade: 18, altura: 58 },
    { dia: "Ter", quantidade: 24, altura: 78 },
    { dia: "Qua", quantidade: 21, altura: 68 },
    { dia: "Qui", quantidade: 30, altura: 100 },
    { dia: "Sex", quantidade: 25, altura: 82 },
    { dia: "Sáb", quantidade: 10, altura: 32 },
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

      <section className="data-container">
        <button className="back-button" type="button">
          ← Voltar aos relatórios
        </button>

        <div className="data-heading">
          <div>
            <p className="eyebrow-dashboard">
              VISUALIZAÇÃO DE DADOS
            </p>

            <h1>Indicadores de atendimento</h1>

            <p>
              Visualize de forma resumida os principais dados
              dos atendimentos realizados no EduFila.
            </p>
          </div>

          <div className="data-period">
            <span>Período</span>
            <strong>01/08/2026 a 31/08/2026</strong>
          </div>
        </div>

        <section className="data-summary">
          <article className="data-summary-card">
            <span>Total de atendimentos</span>
            <strong>128</strong>
            <small>Atendimentos registrados</small>
          </article>

          <article className="data-summary-card">
            <span>Concluídos</span>
            <strong>119</strong>
            <small>93% do total</small>
          </article>

          <article className="data-summary-card">
            <span>Tempo médio</span>
            <strong>11 min</strong>
            <small>Espera média</small>
          </article>

          <article className="data-summary-card">
            <span>Setor mais demandado</span>
            <strong>Secretaria</strong>
            <small>52 atendimentos</small>
          </article>
        </section>

        <section className="data-grid">
          <article className="data-panel">
            <div className="data-panel-heading">
              <div>
                <p className="panel-overline">
                  ATENDIMENTOS POR SETOR
                </p>

                <h2>Distribuição dos atendimentos</h2>
              </div>
            </div>

            <div className="sector-chart">
              {setores.map((setor) => (
                <div
                  className="sector-chart-row"
                  key={setor.nome}
                >
                  <div className="sector-chart-info">
                    <div>
                      <strong>{setor.nome}</strong>

                      <span>
                        Tempo médio: {setor.espera}
                      </span>
                    </div>

                    <strong>
                      {setor.atendimentos}
                    </strong>
                  </div>

                  <div className="chart-track">
                    <div
                      className="chart-fill"
                      style={{
                        width: `${setor.percentual}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="data-panel">
            <div className="data-panel-heading">
              <div>
                <p className="panel-overline">
                  ATENDIMENTOS POR DIA
                </p>

                <h2>Movimento semanal</h2>
              </div>
            </div>

            <div className="daily-chart">
              {dias.map((item) => (
                <div
                  className="daily-column"
                  key={item.dia}
                >
                  <span className="daily-value">
                    {item.quantidade}
                  </span>

                  <div className="daily-bar-area">
                    <div
                      className="daily-bar"
                      style={{
                        height: `${item.altura}%`,
                      }}
                    ></div>
                  </div>

                  <strong>{item.dia}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="data-grid-bottom">
          <article className="data-panel">
            <p className="panel-overline">
              STATUS DOS ATENDIMENTOS
            </p>

            <h2>Resultado no período</h2>

            <div className="status-data-list">
              <div>
                <div>
                  <span className="status-marker completed"></span>
                  <span>Concluídos</span>
                </div>

                <strong>119</strong>
              </div>

              <div>
                <div>
                  <span className="status-marker cancelled"></span>
                  <span>Cancelados</span>
                </div>

                <strong>9</strong>
              </div>
            </div>

            <div className="status-total-bar">
              <div
                className="status-total-completed"
                style={{ width: "93%" }}
              ></div>

              <div
                className="status-total-cancelled"
                style={{ width: "7%" }}
              ></div>
            </div>

            <div className="status-percentages">
              <span>93% concluídos</span>
              <span>7% cancelados</span>
            </div>
          </article>

          <article className="data-panel">
            <p className="panel-overline">
              TEMPO MÉDIO DE ESPERA
            </p>

            <h2>Comparação entre setores</h2>

            <div className="waiting-list">
              {setores.map((setor) => (
                <div
                  className="waiting-item"
                  key={setor.nome}
                >
                  <span>{setor.nome}</span>
                  <strong>{setor.espera}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            Os indicadores apresentados são informações
            resumidas dos atendimentos e possuem caráter
            informativo.
          </p>
        </div>
      </section>
    </main>
  )
}

export default VisualizacaoDados