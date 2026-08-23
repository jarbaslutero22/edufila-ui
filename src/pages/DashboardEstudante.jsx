import "../App.css"

function DashboardEstudante() {
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

      <section className="dashboard-container">
        <div className="welcome-section">
          <div>
            <p className="eyebrow-dashboard">PAINEL DO ESTUDANTE</p>
            <h1>Olá, bem-vindo ao EduFila</h1>
            <p>
              Solicite um atendimento e acompanhe sua posição na fila de forma
              simples e transparente.
            </p>
          </div>

          <button className="dashboard-primary-button">
            Solicitar atendimento
          </button>
        </div>

        <section className="dashboard-cards">
          <article className="info-card">
            <span className="card-label">Atendimento atual</span>
            <strong>Nenhum atendimento ativo</strong>
            <p>Você ainda não entrou em uma fila.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Minha senha</span>
            <strong>—</strong>
            <p>A senha será exibida após solicitar atendimento.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Posição na fila</span>
            <strong>—</strong>
            <p>Sua posição aparecerá aqui.</p>
          </article>

          <article className="info-card">
            <span className="card-label">Tempo estimado</span>
            <strong>—</strong>
            <p>Estimativa disponível durante o atendimento.</p>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-overline">ATENDIMENTO</span>
                <h2>Acompanhe sua fila</h2>
              </div>

              <span className="status-badge">Sem fila ativa</span>
            </div>

            <div className="empty-state">
              <div className="empty-icon">↗</div>
              <h3>Nenhum atendimento em andamento</h3>
              <p>
                Solicite um atendimento para receber sua senha virtual e
                acompanhar sua posição.
              </p>
              <button className="secondary-button">
                Escolher setor
              </button>
            </div>
          </article>

          <aside className="dashboard-panel history-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-overline">HISTÓRICO</span>
                <h2>Últimos atendimentos</h2>
              </div>
            </div>

            <div className="history-empty">
              <p>Nenhum atendimento registrado.</p>
              <button className="text-button">Ver histórico</button>
            </div>
          </aside>
        </section>
      </section>
    </main>
  )
}

export default DashboardEstudante