import { useEffect, useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

const MINHA_SENHA = "A001"

function AcompanhamentoFila() {
  const [fila, setFila] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarFila() {
      try {
        setCarregando(true)
        setErro("")

        const dados = await apiFetch("/api/fila")

        setFila(dados.fila || [])
      } catch (error) {
        setErro(error.message || "Não foi possível carregar a fila.")
      } finally {
        setCarregando(false)
      }
    }

    carregarFila()
  }, [])

  const minhaSenha = fila.find(
    (item) =>
      item.codigo.toUpperCase() === MINHA_SENHA.toUpperCase()
  )

  const filaOrdenada = [...fila].sort((a, b) => {
    if (a.prioridade === b.prioridade) {
      return a.id - b.id
    }

    return a.prioridade ? -1 : 1
  })

  const minhaPosicao = minhaSenha
    ? filaOrdenada.findIndex(
        (item) => item.codigo === minhaSenha.codigo
      ) + 1
    : 0

  const senhaEmAtendimento = fila.find(
    (item) => item.status === "em_atendimento"
  )

  const quantidadeAntes =
    minhaPosicao > 0 ? minhaPosicao - 1 : 0

  const statusMinhaSenha =
    minhaSenha?.status === "em_atendimento"
      ? "Em atendimento"
      : minhaSenha?.status === "finalizado"
      ? "Finalizado"
      : "Aguardando atendimento"

  const descricaoMinhaSenha =
    minhaSenha?.status === "em_atendimento"
      ? "Seu atendimento está acontecendo agora"
      : minhaSenha?.status === "finalizado"
      ? "Seu atendimento foi finalizado"
      : "Você está aguardando na fila"

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
            <p className="eyebrow-dashboard">
              ACOMPANHAMENTO
            </p>

            <h1>Acompanhe sua fila</h1>

            <p>
              Consulte sua posição e acompanhe o andamento do
              atendimento.
            </p>
          </div>

          <span className="fila-live">
            <span className="status-dot"></span>
            Fila atualizada
          </span>
        </div>

        {carregando && (
          <div className="fila-alert">
            <div className="fila-alert-icon">...</div>

            <div>
              <strong>Carregando fila</strong>

              <p>
                Consultando os dados atuais do EduFila.
              </p>
            </div>
          </div>
        )}

        {erro && (
          <div className="fila-alert">
            <div className="fila-alert-icon">!</div>

            <div>
              <strong>Não foi possível carregar a fila</strong>

              <p>{erro}</p>
            </div>
          </div>
        )}

        {!carregando && !erro && (
          <>
            <section className="fila-summary">
              <article className="fila-main-card">
                <span className="fila-label">
                  Sua senha
                </span>

                <strong className="fila-ticket">
                  {minhaSenha?.codigo || MINHA_SENHA}
                </strong>

                <span className="fila-status">
                  {statusMinhaSenha}
                </span>

                <div className="fila-main-info">
                  <div>
                    <span>Setor</span>

                    <strong>
                      Secretaria Acadêmica
                    </strong>
                  </div>

                  <div>
                    <span>Demanda</span>

                    <strong>
                      Documentação acadêmica
                    </strong>
                  </div>
                </div>
              </article>

              <div className="fila-metrics">
                <article className="fila-metric-card">
                  <span>Posição na fila</span>

                  <strong>
                    {minhaPosicao > 0
                      ? `${minhaPosicao}º`
                      : "—"}
                  </strong>

                  <small>
                    {quantidadeAntes > 0
                      ? `${quantidadeAntes} atendimento${
                          quantidadeAntes > 1
                            ? "s"
                            : ""
                        } até sua vez`
                      : "Você é o próximo"}
                  </small>
                </article>

                <article className="fila-metric-card">
                  <span>Senha em atendimento</span>

                  <strong>
                    {senhaEmAtendimento?.codigo || "—"}
                  </strong>

                  <small>
                    {senhaEmAtendimento
                      ? "Atendimento em andamento"
                      : "Nenhum atendimento em andamento"}
                  </small>
                </article>

                <article className="fila-metric-card">
                  <span>Total na fila</span>

                  <strong>{filaOrdenada.length}</strong>

                  <small>
                    Senhas aguardando atendimento
                  </small>
                </article>
              </div>
            </section>

            <section className="fila-grid">
              <article className="fila-panel">
                <div className="fila-panel-heading">
                  <div>
                    <p className="panel-overline">
                      ORDEM DE ATENDIMENTO
                    </p>

                    <h2>Fila atual</h2>
                  </div>

                  <span className="fila-count">
                    {filaOrdenada.length}{" "}
                    {filaOrdenada.length === 1
                      ? "senha"
                      : "senhas"}
                  </span>
                </div>

                <div className="fila-list">
                  {filaOrdenada.length === 0 && (
                    <div className="fila-item">
                      <div className="fila-item-info">
                        <strong>
                          Fila vazia
                        </strong>

                        <span>
                          Não há senhas aguardando
                          atendimento.
                        </span>
                      </div>
                    </div>
                  )}

                  {filaOrdenada.map((item) => {
                    const ehMinhaSenha =
                      item.codigo.toUpperCase() ===
                      MINHA_SENHA.toUpperCase()

                    const estaEmAtendimento =
                      item.status === "em_atendimento"

                    return (
                      <div
                        className={`fila-item ${
                          ehMinhaSenha
                            ? "fila-item-user"
                            : ""
                        }`}
                        key={item.id}
                      >
                        <div className="fila-number">
                          {item.codigo}
                        </div>

                        <div className="fila-item-info">
                          <strong>
                            {estaEmAtendimento
                              ? "Em atendimento"
                              : ehMinhaSenha
                              ? "Sua senha"
                              : "Aguardando"}
                          </strong>

                          <span>
                            {estaEmAtendimento
                              ? "Atendimento em andamento"
                              : ehMinhaSenha
                              ? "Você está nesta posição"
                              : item.prioridade
                              ? "Atendimento prioritário"
                              : "Aguardando chamada"}
                          </span>
                        </div>

                        {estaEmAtendimento && (
                          <span className="fila-badge atendimento">
                            Em atendimento
                          </span>
                        )}

                        {ehMinhaSenha && (
                          <span className="fila-badge minha-senha">
                            Você
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </article>

              <aside className="fila-panel fila-side-panel">
                <p className="panel-overline">
                  STATUS
                </p>

                <h2>Seu atendimento</h2>

                <div className="fila-timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-dot">
                      ✓
                    </div>

                    <div>
                      <strong>
                        Solicitação realizada
                      </strong>

                      <span>
                        Senha{" "}
                        {minhaSenha?.codigo ||
                          MINHA_SENHA}{" "}
                        registrada
                      </span>
                    </div>
                  </div>

                  <div
                    className={`timeline-item ${
                      minhaSenha?.status ===
                        "aguardando" ||
                      !minhaSenha
                        ? "active"
                        : "completed"
                    }`}
                  >
                    <div className="timeline-dot">
                      2
                    </div>

                    <div>
                      <strong>
                        Aguardando na fila
                      </strong>

                      <span>
                        {minhaPosicao > 0
                          ? `Posição atual: ${minhaPosicao}º`
                          : "Posição não disponível"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`timeline-item ${
                      minhaPosicao === 1
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-dot">
                      3
                    </div>

                    <div>
                      <strong>
                        Próximo da chamada
                      </strong>

                      <span>
                        Você será notificado
                      </span>
                    </div>
                  </div>

                  <div
                    className={`timeline-item ${
                      minhaSenha?.status ===
                      "em_atendimento"
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-dot">
                      4
                    </div>

                    <div>
                      <strong>
                        Em atendimento
                      </strong>

                      <span>
                        {minhaSenha?.status ===
                        "em_atendimento"
                          ? "Atendimento iniciado"
                          : "Aguardando início"}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </section>

            <div className="fila-alert">
              <div className="fila-alert-icon">
                !
              </div>

              <div>
                <strong>
                  Fique atento à sua senha
                </strong>

                <p>
                  Quando sua vez estiver próxima, o
                  EduFila exibirá uma notificação para
                  avisar sobre a proximidade do
                  atendimento.
                </p>
              </div>
            </div>

            <div className="fila-alert">
              <div className="fila-alert-icon">
                ✓
              </div>

              <div>
                <strong>
                  API integrada com sucesso
                </strong>

                <p>
                  Esta tela está utilizando os dados
                  reais fornecidos pela API do EduFila.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default AcompanhamentoFila