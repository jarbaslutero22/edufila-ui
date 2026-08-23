import "../App.css"

function EscolhaSetor() {
  const setores = [
    {
      nome: "Secretaria Acadêmica",
      descricao: "Documentos, matrícula e informações acadêmicas.",
      fila: 4,
      espera: "≈ 12 min",
      disponivel: true,
    },
    {
      nome: "Coordenação do Curso",
      descricao: "Orientações acadêmicas e assuntos relacionados ao curso.",
      fila: 2,
      espera: "≈ 8 min",
      disponivel: true,
    },
    {
      nome: "Atendimento ao Estudante",
      descricao: "Dúvidas gerais e suporte aos serviços acadêmicos.",
      fila: 6,
      espera: "≈ 18 min",
      disponivel: true,
    },
    {
      nome: "Setor Administrativo",
      descricao: "Solicitações e orientações administrativas.",
      fila: 0,
      espera: "Indisponível",
      disponivel: false,
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

      <section className="setor-container">
        <div className="setor-heading">
          <button className="back-button" type="button">
            ← Voltar
          </button>

          <p className="eyebrow-dashboard">SOLICITAR ATENDIMENTO</p>

          <h1>Escolha o setor</h1>

          <p>
            Selecione o setor responsável pelo atendimento que você precisa.
          </p>
        </div>

        <section className="setores-grid">
          {setores.map((setor) => (
            <article
              key={setor.nome}
              className={`setor-card ${
                !setor.disponivel ? "setor-disabled" : ""
              }`}
            >
              <div className="setor-card-top">
                <div className="setor-icon">▦</div>

                <span
                  className={
                    setor.disponivel
                      ? "availability-badge available"
                      : "availability-badge unavailable"
                  }
                >
                  {setor.disponivel ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <h2>{setor.nome}</h2>
              <p>{setor.descricao}</p>

              <div className="setor-info">
                <div>
                  <span>Pessoas na fila</span>
                  <strong>{setor.disponivel ? setor.fila : "—"}</strong>
                </div>

                <div>
                  <span>Espera estimada</span>
                  <strong>{setor.espera}</strong>
                </div>
              </div>

              <button
                className="setor-button"
                type="button"
                disabled={!setor.disponivel}
              >
                {setor.disponivel
                  ? "Selecionar setor"
                  : "Atendimento indisponível"}
              </button>
            </article>
          ))}
        </section>

        <div className="setor-notice">
          <div className="notice-icon">i</div>

          <div>
            <strong>Como funciona?</strong>
            <p>
              Após escolher o setor, você poderá informar o tipo de demanda e
              confirmar a solicitação. O EduFila gerará automaticamente sua
              senha virtual e sua posição na fila.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EscolhaSetor