import "../App.css"

function HistoricoAtendimentos() {
  const atendimentos = [
    {
      data: "20/08/2026",
      senha: "A018",
      setor: "Secretaria Acadêmica",
      demanda: "Documentação acadêmica",
      status: "Concluído",
      horario: "10:32",
    },
    {
      data: "12/08/2026",
      senha: "C007",
      setor: "Coordenação do Curso",
      demanda: "Orientação acadêmica",
      status: "Concluído",
      horario: "14:18",
    },
    {
      data: "05/08/2026",
      senha: "A041",
      setor: "Atendimento ao Estudante",
      demanda: "Informações acadêmicas",
      status: "Concluído",
      horario: "09:45",
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
            <strong>{atendimentos.length}</strong>
          </div>
        </div>

        <section className="historico-filtros">
          <div className="field-group">
            <label htmlFor="setor-historico">Setor</label>

            <select id="setor-historico" defaultValue="todos">
              <option value="todos">Todos os setores</option>
              <option value="secretaria">Secretaria Acadêmica</option>
              <option value="coordenacao">Coordenação do Curso</option>
              <option value="atendimento">Atendimento ao Estudante</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="periodo-historico">Período</label>

            <select id="periodo-historico" defaultValue="todos">
              <option value="todos">Todo o período</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="ano">Este ano</option>
            </select>
          </div>
        </section>

        <section className="historico-lista">
          {atendimentos.map((atendimento) => (
            <article className="historico-card" key={atendimento.senha}>
              <div className="historico-data">
                <span>{atendimento.data}</span>
                <small>{atendimento.horario}</small>
              </div>

              <div className="historico-principal">
                <div>
                  <span className="historico-label">Setor</span>
                  <strong>{atendimento.setor}</strong>
                </div>

                <p>{atendimento.demanda}</p>
              </div>

              <div className="historico-senha">
                <span>Senha</span>
                <strong>{atendimento.senha}</strong>
              </div>

              <div className="historico-status">
                <span className="status-concluido">
                  ✓ {atendimento.status}
                </span>
              </div>
            </article>
          ))}
        </section>

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