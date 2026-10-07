import { useEffect, useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

function PainelServidor() {
  const [fila, setFila] = useState([])
  const [atendimentoAtual, setAtendimentoAtual] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState("")
  const [mensagem, setMensagem] = useState("")

  async function carregarFila() {
    try {
      setCarregando(true)
      setErro("")

      const dados = await apiFetch("/api/fila")

      const lista = dados.fila || []

      setFila(lista)

      const atendimento = lista.find(
        (item) => item.status === "em_atendimento"
      )

      setAtendimentoAtual(atendimento || null)
    } catch (error) {
      setErro(
        error.message || "Não foi possível carregar a fila."
      )
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarFila()
  }, [])

  function calcularEspera(horarioEntrada) {
    if (!horarioEntrada) {
      return "—"
    }

    const entrada = new Date(horarioEntrada)
    const agora = new Date()

    const diferenca =
      Math.max(0, agora.getTime() - entrada.getTime())

    const minutos = Math.floor(
      diferenca / 1000 / 60
    )

    if (minutos === 0) {
      return "menos de 1 min"
    }

    return `${minutos} min`
  }

  async function chamarProximo() {
    try {
      setProcessando(true)
      setErro("")
      setMensagem("")

      const dados = await apiFetch(
        "/api/fila/chamar-proximo",
        {
          method: "PATCH",
        }
      )

      setAtendimentoAtual(dados.atendimento)

      setMensagem(
        `${dados.atendimento.codigo} chamado para atendimento.`
      )

      await carregarFila()
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível chamar o próximo estudante."
      )
    } finally {
      setProcessando(false)
    }
  }

  async function priorizarSenha(codigo) {
    try {
      setProcessando(true)
      setErro("")
      setMensagem("")

      const dados = await apiFetch(
        `/api/fila/${codigo}/priorizar`,
        {
          method: "PATCH",
        }
      )

      setMensagem(
        `${dados.senha.codigo} foi priorizada com sucesso.`
      )

      await carregarFila()
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível priorizar a senha."
      )
    } finally {
      setProcessando(false)
    }
  }

  async function adiarSenha(codigo) {
    try {
      setProcessando(true)
      setErro("")
      setMensagem("")

      const dados = await apiFetch(
        `/api/fila/${codigo}/adiar`,
        {
          method: "PATCH",
        }
      )

      setMensagem(
        `${dados.senha.codigo} foi adiada com sucesso.`
      )

      await carregarFila()
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível adiar a senha."
      )
    } finally {
      setProcessando(false)
    }
  }

  async function finalizarAtendimento(codigo) {
    try {
      setProcessando(true)
      setErro("")
      setMensagem("")

      const dados = await apiFetch(
        `/api/fila/${codigo}/finalizar`,
        {
          method: "PATCH",
        }
      )

      setAtendimentoAtual(null)

      setMensagem(
        `${dados.atendimento.codigo} foi finalizado com sucesso.`
      )

      await carregarFila()
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível finalizar o atendimento."
      )
    } finally {
      setProcessando(false)
    }
  }

  const aguardando = fila.filter(
    (item) => item.status === "aguardando"
  )

  const quantidadeAguardando = aguardando.length

  const proximaSenha = aguardando[0]

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
            <p className="eyebrow-dashboard">
              PAINEL DO SERVIDOR
            </p>

            <h1>Gerenciamento da fila</h1>

            <p>
              Acompanhe a fila do seu setor e execute as ações de
              atendimento.
            </p>
          </div>

          <button
            className="dashboard-primary-button"
            type="button"
            onClick={chamarProximo}
            disabled={processando || quantidadeAguardando === 0}
          >
            {processando
              ? "Processando..."
              : "Chamar próximo"}
          </button>
        </div>

        {erro && (
          <div className="geracao-warning">
            <div className="notice-icon">!</div>

            <div>
              <strong>
                Não foi possível executar a ação
              </strong>

              <p>{erro}</p>
            </div>
          </div>
        )}

        {mensagem && (
          <div className="geracao-warning">
            <div className="notice-icon">✓</div>

            <div>
              <strong>
                Operação realizada
              </strong>

              <p>{mensagem}</p>
            </div>
          </div>
        )}

        <section className="servidor-cards">
          <article className="info-card">
            <span className="card-label">
              Pessoas aguardando
            </span>

            <strong>
              {carregando ? "..." : quantidadeAguardando}
            </strong>

            <p>
              Fila atual do setor.
            </p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Próxima senha
            </span>

            <strong>
              {proximaSenha?.codigo || "—"}
            </strong>

            <p>
              Próximo atendimento previsto.
            </p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Atendimento atual
            </span>

            <strong>
              {atendimentoAtual?.codigo || "—"}
            </strong>

            <p>
              Atendimento em andamento.
            </p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Total na fila
            </span>

            <strong>
              {carregando ? "..." : fila.length}
            </strong>

            <p>
              Senhas registradas no setor.
            </p>
          </article>
        </section>

        <section className="servidor-grid">
          <article className="servidor-panel">
            <div className="servidor-panel-heading">
              <div>
                <p className="panel-overline">
                  FILA ATUAL
                </p>

                <h2>
                  Estudantes aguardando
                </h2>
              </div>

              <span className="fila-count">
                {quantidadeAguardando}{" "}
                {quantidadeAguardando === 1
                  ? "na fila"
                  : "na fila"}
              </span>
            </div>

            <div className="servidor-lista">
              {carregando && (
                <div className="servidor-item">
                  <div className="servidor-estudante">
                    <strong>
                      Carregando fila...
                    </strong>

                    <span>
                      Consultando a API do EduFila.
                    </span>
                  </div>
                </div>
              )}

              {!carregando &&
                aguardando.length === 0 && (
                  <div className="servidor-item">
                    <div className="servidor-estudante">
                      <strong>
                        Fila vazia
                      </strong>

                      <span>
                        Não existem estudantes aguardando atendimento.
                      </span>
                    </div>
                  </div>
                )}

              {!carregando &&
                aguardando.map((item) => (
                  <div
                    className="servidor-item"
                    key={item.id}
                  >
                    <div className="servidor-senha">
                      {item.codigo}
                    </div>

                    <div className="servidor-estudante">
                      <strong>
                        {item.estudante}
                      </strong>

                      <span>
                        Espera:{" "}
                        {calcularEspera(
                          item.horarioEntrada
                        )}
                      </span>
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
                      <button
                        className="action-button primary"
                        type="button"
                        onClick={chamarProximo}
                        disabled={processando}
                      >
                        Chamar
                      </button>

                      <button
                        className="action-button"
                        type="button"
                        onClick={() =>
                          priorizarSenha(
                            item.codigo
                          )
                        }
                        disabled={
                          processando ||
                          item.prioridade
                        }
                      >
                        Priorizar
                      </button>

                      <button
                        className="action-button"
                        type="button"
                        onClick={() =>
                          adiarSenha(
                            item.codigo
                          )
                        }
                        disabled={processando}
                      >
                        Adiar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </article>

          <aside className="servidor-panel atendimento-panel">
            <p className="panel-overline">
              ATENDIMENTO ATUAL
            </p>

            {atendimentoAtual ? (
              <>
                <h2>
                  Senha {atendimentoAtual.codigo}
                </h2>

                <div className="atendimento-info">
                  <div>
                    <span>Estudante</span>

                    <strong>
                      {atendimentoAtual.estudante}
                    </strong>
                  </div>

                  <div>
                    <span>Início</span>

                    <strong>
                      {atendimentoAtual.horarioChamada
                        ? new Date(
                            atendimentoAtual.horarioChamada
                          ).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <strong className="status-atendimento">
                      Em atendimento
                    </strong>
                  </div>
                </div>

                <button
                  className="finalizar-button"
                  type="button"
                  onClick={() =>
                    finalizarAtendimento(
                      atendimentoAtual.codigo
                    )
                  }
                  disabled={processando}
                >
                  {processando
                    ? "Processando..."
                    : "Finalizar atendimento"}
                </button>
              </>
            ) : (
              <>
                <h2>
                  Nenhum atendimento
                </h2>

                <div className="atendimento-info">
                  <div>
                    <span>Status</span>

                    <strong>
                      Aguardando chamada
                    </strong>
                  </div>

                  <div>
                    <span>Próxima senha</span>

                    <strong>
                      {proximaSenha?.codigo || "—"}
                    </strong>
                  </div>
                </div>

                <button
                  className="finalizar-button"
                  type="button"
                  onClick={chamarProximo}
                  disabled={
                    processando ||
                    quantidadeAguardando === 0
                  }
                >
                  Chamar próximo
                </button>
              </>
            )}
          </aside>
        </section>

        <div className="geracao-warning">
          <div className="notice-icon">✓</div>

          <p>
            O painel do servidor está integrado à API do EduFila.
            As ações de chamar, priorizar, adiar e finalizar
            atendimento são executadas diretamente no backend.
          </p>
        </div>
      </section>
    </main>
  )
}

export default PainelServidor