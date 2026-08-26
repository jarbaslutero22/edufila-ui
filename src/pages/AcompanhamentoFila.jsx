import "../App.css"

function AcompanhamentoFila() {
  const fila = [
    { senha: "A020", status: "Em atendimento" },
    { senha: "A021", status: "Aguardando" },
    { senha: "A022", status: "Aguardando" },
    { senha: "A023", status: "Sua senha" },
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
            <strong>Estudante</strong>
            <span>Perfil acadêmico</span>
          </div>

          <div className="user-avatar">E</div>
        </div>
      </header>

      <section className="fila-container">
        <button className="back-button" type="button">
          ← Voltar ao painel
        </button>

        <div className="fila-heading">
          <div>
            <p className="eyebrow-dashboard">ACOMPANHAMENTO</p>
            <h1>Acompanhe sua fila</h1>
            <p>
              Consulte sua posição e acompanhe o andamento do atendimento.
            </p>
          </div>

          <span className="fila-live">
            <span className="status-dot"></span>
            Fila atualizada
          </span>
        </div>

        <section className="fila-summary">
          <article className="fila-main-card">
            <span className="fila-label">Sua senha</span>

            <strong className="fila-ticket">A023</strong>

            <span className="fila-status">
              Aguardando atendimento
            </span>

            <div className="fila-main-info">
              <div>
                <span>Setor</span>
                <strong>Secretaria Acadêmica</strong>
              </div>

              <div>
                <span>Demanda</span>
                <strong>Documentação acadêmica</strong>
              </div>
            </div>
          </article>

          <div className="fila-metrics">
            <article className="fila-metric-card">
              <span>Posição na fila</span>
              <strong>3º</strong>
              <small>3 atendimentos até sua vez</small>
            </article>

            <article className="fila-metric-card">
              <span>Senha em atendimento</span>
              <strong>A020</strong>
              <small>Atendimento em andamento</small>
            </article>

            <article className="fila-metric-card">
              <span>Tempo estimado</span>
              <strong>≈ 12 min</strong>
              <small>Estimativa de espera</small>
            </article>
          </div>
        </section>

        <section className="fila-grid">
          <article className="fila-panel">
            <div className="fila-panel-heading">
              <div>
                <p className="panel-overline">ORDEM DE ATENDIMENTO</p>
                <h2>Fila atual</h2>
              </div>

              <span className="fila-count">
                4 senhas
              </span>
            </div>

            <div className="fila-list">
              {fila.map((item) => (
                <div
                  className={`fila-item ${
                    item.status === "Sua senha"
                      ? "fila-item-user"
                      : ""
                  }`}
                  key={item.senha}
                >
                  <div className="fila-number">
                    {item.senha}
                  </div>

                  <div className="fila-item-info">
                    <strong>{item.status}</strong>

                    <span>
                      {item.status === "Em atendimento"
                        ? "Atendimento em andamento"
                        : item.status === "Sua senha"
                        ? "Você está nesta posição"
                        : "Aguardando chamada"}
                    </span>
                  </div>

                  {item.status === "Em atendimento" && (
                    <span className="fila-badge atendimento">
                      Em atendimento
                    </span>
                  )}

                  {item.status === "Sua senha" && (
                    <span className="fila-badge minha-senha">
                      Você
                    </span>
                  )}
                </div>
              ))}
            </div>
          </article>

          <aside className="fila-panel fila-side-panel">
            <p className="panel-overline">STATUS</p>

            <h2>Seu atendimento</h2>

            <div className="fila-timeline">
              <div className="timeline-item completed">
                <div className="timeline-dot">✓</div>

                <div>
                  <strong>Solicitação realizada</strong>
                  <span>Senha A023 gerada</span>
                </div>
              </div>

              <div className="timeline-item active">
                <div className="timeline-dot">2</div>

                <div>
                  <strong>Aguardando na fila</strong>
                  <span>Posição atual: 3º</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">3</div>

                <div>
                  <strong>Próximo da chamada</strong>
                  <span>Você será notificado</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">4</div>

                <div>
                  <strong>Em atendimento</strong>
                  <span>Aguardando início</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <div className="fila-alert">
          <div className="fila-alert-icon">!</div>

          <div>
            <strong>Fique atento à sua senha</strong>
            <p>
              Quando sua vez estiver próxima, o EduFila exibirá uma
              notificação para avisar sobre a proximidade do atendimento.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AcompanhamentoFila