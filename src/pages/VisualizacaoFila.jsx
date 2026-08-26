import "../App.css"

function VisualizacaoFila() {
  const fila = [
    {
      posicao: 1,
      senha: "A021",
      estudante: "Ana Carolina",
      horario: "10:32",
      espera: "12 min",
      prioridade: false,
      status: "Próximo",
    },
    {
      posicao: 2,
      senha: "A022",
      estudante: "Rafael Silva",
      horario: "10:36",
      espera: "8 min",
      prioridade: true,
      status: "Aguardando",
    },
    {
      posicao: 3,
      senha: "A023",
      estudante: "Marcos Pereira",
      horario: "10:40",
      espera: "5 min",
      prioridade: false,
      status: "Aguardando",
    },
    {
      posicao: 4,
      senha: "A024",
      estudante: "Juliana Costa",
      horario: "10:43",
      espera: "3 min",
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

      <section className="visualizacao-fila-container">
        <button className="back-button" type="button">
          ← Voltar ao painel
        </button>

        <div className="visualizacao-fila-heading">
          <div>
            <p className="eyebrow-dashboard">GERENCIAMENTO</p>
            <h1>Fila de atendimento</h1>

            <p>
              Visualize a ordem das senhas e acompanhe a situação atual do
              atendimento do setor.
            </p>
          </div>

          <div className="fila-atualizada">
            <span className="status-dot"></span>
            Atualizada agora
          </div>
        </div>

        <section className="fila-resumo-servidor">
          <article>
            <span>Aguardando</span>
            <strong>4</strong>
          </article>

          <article>
            <span>Em atendimento</span>
            <strong>1</strong>
          </article>

          <article>
            <span>Prioridades</span>
            <strong>1</strong>
          </article>

          <article>
            <span>Tempo médio</span>
            <strong>≈ 9 min</strong>
          </article>
        </section>

        <section className="fila-atendimento-atual">
          <div>
            <p className="panel-overline">ATENDIMENTO ATUAL</p>
            <span>Senha</span>
            <strong>A020</strong>
          </div>

          <div>
            <span>Estudante</span>
            <strong>João Ferreira</strong>
          </div>

          <div>
            <span>Início</span>
            <strong>10:24</strong>
          </div>

          <span className="status-concluido">
            Em atendimento
          </span>
        </section>

        <section className="fila-tabela-card">
          <div className="fila-tabela-header">
            <div>
              <p className="panel-overline">FILA DO SETOR</p>
              <h2>Senhas aguardando</h2>
            </div>

            <button className="dashboard-primary-button" type="button">
              Chamar próximo
            </button>
          </div>

          <div className="fila-table-wrapper">
            <table className="fila-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Senha</th>
                  <th>Estudante</th>
                  <th>Entrada</th>
                  <th>Espera</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {fila.map((item) => (
                  <tr key={item.senha}>
                    <td>
                      <span className="position-number">
                        {item.posicao}º
                      </span>
                    </td>

                    <td>
                      <strong className="table-senha">
                        {item.senha}
                      </strong>
                    </td>

                    <td>{item.estudante}</td>

                    <td>{item.horario}</td>

                    <td>{item.espera}</td>

                    <td>
                      {item.prioridade ? (
                        <span className="priority-badge">
                          Prioridade
                        </span>
                      ) : (
                        <span className="normal-badge">
                          Normal
                        </span>
                      )}
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "Próximo"
                            ? "queue-status next"
                            : "queue-status waiting"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="fila-table-actions">
                        <button
                          className="action-button primary"
                          type="button"
                        >
                          Chamar
                        </button>

                        <button
                          className="action-button"
                          type="button"
                        >
                          Priorizar
                        </button>

                        <button
                          className="action-button"
                          type="button"
                        >
                          Adiar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            A ordem da fila deve respeitar a ordem das solicitações e os
            critérios de prioridade definidos para o atendimento.
          </p>
        </div>
      </section>
    </main>
  )
}

export default VisualizacaoFila