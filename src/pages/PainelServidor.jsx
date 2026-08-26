import "../App.css"

function PainelServidor() {
  const fila = [
    {
      senha: "A021",
      estudante: "Ana Carolina",
      espera: "08 min",
      prioridade: false,
      status: "Aguardando",
    },
    {
      senha: "A022",
      estudante: "Rafael Silva",
      espera: "06 min",
      prioridade: true,
      status: "Aguardando",
    },
    {
      senha: "A023",
      estudante: "Marcos Pereira",
      espera: "04 min",
      prioridade: false,
      status: "Aguardando",
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
            <span>Secretaria Acadêmica</span>
          </div>

          <div className="user-avatar">S</div>
        </div>
      </header>

      <section className="servidor-container">
        <div className="servidor-heading">
          <div>
            <p className="eyebrow-dashboard">PAINEL DO SERVIDOR</p>
            <h1>Gerenciamento da fila</h1>
            <p>
              Acompanhe a fila do seu setor e execute as ações de atendimento.
            </p>
          </div>

          <button className="dashboard-primary-button">
            Chamar próximo
          </button>
        </div>

        <section className="servidor-cards">
          <article className="info-card">
            <span className="card-label">Pessoas aguardando</span>
            <strong>3</strong>
            <p>Fila atual do setor.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Próxima senha</span>
            <strong>A021</strong>
            <p>Próximo atendimento previsto.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Atendidos hoje</span>
            <strong>12</strong>
            <p>Atendimentos finalizados.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Tempo médio</span>
            <strong>≈ 9 min</strong>
            <p>Tempo médio de espera.</p>
          </article>
        </section>

        <section className="servidor-grid">
          <article className="servidor-panel">
            <div className="servidor-panel-heading">
              <div>
                <p className="panel-overline">FILA ATUAL</p>
                <h2>Estudantes aguardando</h2>
              </div>

              <span className="fila-count">3 na fila</span>
            </div>

            <div className="servidor-lista">
              {fila.map((item) => (
                <div className="servidor-item" key={item.senha}>
                  <div className="servidor-senha">
                    {item.senha}
                  </div>

                  <div className="servidor-estudante">
                    <strong>{item.estudante}</strong>
                    <span>Espera: {item.espera}</span>
                  </div>

                  <div className="servidor-prioridade">
                    {item.prioridade ? (
                      <span className="priority-badge">
                        Prioridade
                      </span>
                    ) : (
                      <span className="normal-badge">
                        Normal
                      </span>
                    )}
                  </div>

                  <div className="servidor-actions">
                    <button className="action-button primary">
                      Chamar
                    </button>

                    <button className="action-button">
                      Priorizar
                    </button>

                    <button className="action-button">
                      Adiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="servidor-panel atendimento-panel">
            <p className="panel-overline">ATENDIMENTO ATUAL</p>

            <h2>Senha A020</h2>

            <div className="atendimento-info">
              <div>
                <span>Estudante</span>
                <strong>João Ferreira</strong>
              </div>

              <div>
                <span>Início</span>
                <strong>10:24</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="status-atendimento">
                  Em atendimento
                </strong>
              </div>
            </div>

            <button className="finalizar-button">
              Finalizar atendimento
            </button>
          </aside>
        </section>
      </section>
    </main>
  )
}

export default PainelServidor