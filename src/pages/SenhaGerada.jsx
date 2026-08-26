import "../App.css"

function SenhaGerada() {
  return (
    <main className="senha-page">
      <section className="senha-card">
        <div className="success-icon">✓</div>

        <p className="senha-eyebrow">SOLICITAÇÃO CONFIRMADA</p>

        <h1>Atendimento solicitado com sucesso!</h1>

        <p className="senha-description">
          Sua senha foi gerada. Acompanhe sua posição na fila pelo EduFila.
        </p>

        <div className="senha-number-box">
          <span>Sua senha</span>
          <strong>A023</strong>
          <small>Aguardando atendimento</small>
        </div>

        <div className="senha-details">
          <div>
            <span>Setor</span>
            <strong>Secretaria Acadêmica</strong>
          </div>

          <div>
            <span>Tipo de demanda</span>
            <strong>Documentação acadêmica</strong>
          </div>

          <div>
            <span>Posição na fila</span>
            <strong>4º</strong>
          </div>

          <div>
            <span>Tempo estimado</span>
            <strong>≈ 12 min</strong>
          </div>
        </div>

        <div className="senha-notice">
          Mantenha o EduFila aberto para acompanhar as atualizações do seu
          atendimento.
        </div>

        <div className="senha-actions">
          <button className="primary-button">
            Acompanhar fila
          </button>

          <button className="secondary-action">
            Voltar ao início
          </button>
        </div>
      </section>
    </main>
  )
}

export default SenhaGerada