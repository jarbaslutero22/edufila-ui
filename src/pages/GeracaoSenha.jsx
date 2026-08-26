import "../App.css"

function GeracaoSenha() {
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

      <section className="geracao-container">
        <button className="back-button" type="button">
          ← Voltar
        </button>

        <div className="geracao-header">
          <p className="eyebrow-dashboard">SOLICITAR ATENDIMENTO</p>

          <h1>Gerar senha de atendimento</h1>

          <p>
            Confira o setor selecionado, informe o tipo de demanda e confirme
            sua solicitação.
          </p>
        </div>

        <div className="geracao-layout">
          <section className="geracao-form-card">
            <div className="selected-sector">
              <div>
                <span>Setor selecionado</span>
                <strong>Secretaria Acadêmica</strong>
              </div>

              <span className="availability-badge available">
                Disponível
              </span>
            </div>

            <div className="field-group geracao-field">
              <label htmlFor="demanda">Tipo de demanda</label>

              <select id="demanda" defaultValue="">
                <option value="" disabled>
                  Selecione o tipo de atendimento
                </option>

                <option value="matricula">
                  Matrícula
                </option>

                <option value="documentos">
                  Documentos acadêmicos
                </option>

                <option value="declaracao">
                  Declarações
                </option>

                <option value="informacoes">
                  Informações acadêmicas
                </option>

                <option value="outros">
                  Outros
                </option>
              </select>
            </div>

            <div className="field-group geracao-field">
              <label htmlFor="descricao">
                Descrição da solicitação
              </label>

              <textarea
                id="descricao"
                rows="5"
                placeholder="Descreva brevemente o motivo do atendimento..."
              />
            </div>

            <div className="geracao-warning">
              <div className="notice-icon">i</div>

              <p>
                Após confirmar, o sistema irá gerar automaticamente sua senha
                virtual e inserir você na fila deste setor.
              </p>
            </div>

            <button
              type="button"
              className="dashboard-primary-button geracao-submit"
            >
              Confirmar e gerar senha
            </button>
          </section>

          <aside className="geracao-summary">
            <p className="panel-overline">
              RESUMO DO ATENDIMENTO
            </p>

            <h2>Antes de confirmar</h2>

            <div className="summary-item">
              <span>Setor</span>
              <strong>Secretaria Acadêmica</strong>
            </div>

            <div className="summary-item">
              <span>Pessoas na fila</span>
              <strong>4</strong>
            </div>

            <div className="summary-item">
              <span>Tempo estimado</span>
              <strong>≈ 12 min</strong>
            </div>

            <div className="summary-status">
              <span className="status-dot"></span>
              Atendimento disponível
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default GeracaoSenha