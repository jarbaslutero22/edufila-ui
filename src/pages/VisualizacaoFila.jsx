import { useState } from "react"
import "../App.css"

function VisualizacaoFila() {
  const [fila, setFila] = useState([
    {
      senha: "A021",
      estudante: "Ana Carolina",
      horario: "10:32",
      espera: "12 min",
      prioridade: false,
      status: "Próximo",
    },
    {
      senha: "A022",
      estudante: "Rafael Silva",
      horario: "10:36",
      espera: "8 min",
      prioridade: true,
      status: "Aguardando",
    },
    {
      senha: "A023",
      estudante: "Marcos Pereira",
      horario: "10:40",
      espera: "5 min",
      prioridade: false,
      status: "Aguardando",
    },
    {
      senha: "A024",
      estudante: "Juliana Costa",
      horario: "10:43",
      espera: "3 min",
      prioridade: false,
      status: "Aguardando",
    },
  ])

  const [atendimentoAtual, setAtendimentoAtual] = useState({
    senha: "A020",
    estudante: "João Ferreira",
    inicio: "10:24",
  })

  const [historico, setHistorico] = useState([])

  function atualizarStatus(novaFila) {
    return novaFila.map((item, index) => ({
      ...item,
      status: index === 0 ? "Próximo" : "Aguardando",
    }))
  }

  function chamarProximo() {
    if (fila.length === 0) {
      alert("Não há estudantes aguardando atendimento.")
      return
    }

    if (atendimentoAtual) {
      alert("Finalize o atendimento atual antes de chamar o próximo.")
      return
    }

    const proximo = fila[0]

    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setAtendimentoAtual({
      senha: proximo.senha,
      estudante: proximo.estudante,
      inicio: agora,
    })

    setFila((filaAtual) =>
      atualizarStatus(filaAtual.slice(1))
    )
  }

  function chamarSenha(senha) {
    if (atendimentoAtual) {
      alert("Finalize o atendimento atual antes de chamar outra senha.")
      return
    }

    const estudanteChamado = fila.find(
      (item) => item.senha === senha
    )

    if (!estudanteChamado) {
      return
    }

    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setAtendimentoAtual({
      senha: estudanteChamado.senha,
      estudante: estudanteChamado.estudante,
      inicio: agora,
    })

    setFila((filaAtual) =>
      atualizarStatus(
        filaAtual.filter((item) => item.senha !== senha)
      )
    )
  }

  function adiarAtendimento(senha) {
    setFila((filaAtual) => {
      const atendimentoAdiado = filaAtual.find(
        (item) => item.senha === senha
      )

      if (!atendimentoAdiado) {
        return filaAtual
      }

      const restanteFila = filaAtual.filter(
        (item) => item.senha !== senha
      )

      const novaFila = [
        ...restanteFila,
        {
          ...atendimentoAdiado,
          prioridade: false,
          status: "Aguardando",
        },
      ]

      return atualizarStatus(novaFila)
    })
  }

  function priorizarAtendimento(senha) {
    setFila((filaAtual) => {
      const atendimentoPrioritario = filaAtual.find(
        (item) => item.senha === senha
      )

      if (!atendimentoPrioritario) {
        return filaAtual
      }

      const restanteFila = filaAtual.filter(
        (item) => item.senha !== senha
      )

      const novaFila = [
        {
          ...atendimentoPrioritario,
          prioridade: true,
          status: "Próximo",
        },
        ...restanteFila,
      ]

      return atualizarStatus(novaFila)
    })
  }

  function finalizarAtendimento() {
    if (!atendimentoAtual) {
      alert("Não há atendimento em andamento.")
      return
    }

    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const data = new Date().toLocaleDateString("pt-BR")

    const atendimentoFinalizado = {
      ...atendimentoAtual,
      fim: agora,
      data,
      status: "Concluído",
    }

    setHistorico((historicoAtual) => [
      atendimentoFinalizado,
      ...historicoAtual,
    ])

    setAtendimentoAtual(null)

    alert(
      `Atendimento ${atendimentoFinalizado.senha} finalizado com sucesso.`
    )
  }

  const totalPrioridades = fila.filter(
    (item) => item.prioridade
  ).length

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
            <p className="eyebrow-dashboard">
              GERENCIAMENTO
            </p>

            <h1>Fila de atendimento</h1>

            <p>
              Visualize a ordem das senhas e acompanhe a situação
              atual do atendimento do setor.
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
            <strong>{fila.length}</strong>
          </article>

          <article>
            <span>Em atendimento</span>
            <strong>{atendimentoAtual ? 1 : 0}</strong>
          </article>

          <article>
            <span>Prioridades</span>
            <strong>{totalPrioridades}</strong>
          </article>

          <article>
            <span>Finalizados</span>
            <strong>{historico.length}</strong>
          </article>
        </section>

        <section className="fila-atendimento-atual">
          {atendimentoAtual ? (
            <>
              <div>
                <p className="panel-overline">
                  ATENDIMENTO ATUAL
                </p>

                <span>Senha</span>
                <strong>{atendimentoAtual.senha}</strong>
              </div>

              <div>
                <span>Estudante</span>
                <strong>{atendimentoAtual.estudante}</strong>
              </div>

              <div>
                <span>Início</span>
                <strong>{atendimentoAtual.inicio}</strong>
              </div>

              <div>
                <span className="status-concluido">
                  Em atendimento
                </span>

                <button
                  className="finalizar-button"
                  type="button"
                  onClick={finalizarAtendimento}
                >
                  Finalizar atendimento
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="panel-overline">
                  ATENDIMENTO ATUAL
                </p>

                <strong>Nenhum atendimento em andamento</strong>
              </div>

              <button
                className="dashboard-primary-button"
                type="button"
                onClick={chamarProximo}
                disabled={fila.length === 0}
              >
                Chamar próximo
              </button>
            </>
          )}
        </section>

        <section className="fila-tabela-card">
          <div className="fila-tabela-header">
            <div>
              <p className="panel-overline">
                FILA DO SETOR
              </p>

              <h2>Senhas aguardando</h2>
            </div>

            <button
              className="dashboard-primary-button"
              type="button"
              onClick={chamarProximo}
              disabled={
                fila.length === 0 || atendimentoAtual !== null
              }
            >
              {fila.length === 0
                ? "Fila vazia"
                : atendimentoAtual
                ? "Atendimento em andamento"
                : "Chamar próximo"}
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
                {fila.map((item, index) => (
                  <tr key={item.senha}>
                    <td>
                      <span className="position-number">
                        {index + 1}º
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
                          onClick={() =>
                            chamarSenha(item.senha)
                          }
                          disabled={atendimentoAtual !== null}
                        >
                          Chamar
                        </button>

                        <button
                          className="action-button"
                          type="button"
                          onClick={() =>
                            priorizarAtendimento(item.senha)
                          }
                          disabled={item.prioridade}
                        >
                          {item.prioridade
                            ? "Prioritário"
                            : "Priorizar"}
                        </button>

                        <button
                          className="action-button"
                          type="button"
                          onClick={() =>
                            adiarAtendimento(item.senha)
                          }
                        >
                          Adiar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {fila.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign: "center",
                        padding: "32px",
                      }}
                    >
                      Não há estudantes aguardando atendimento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {historico.length > 0 && (
          <section className="fila-tabela-card">
            <div className="fila-tabela-header">
              <div>
                <p className="panel-overline">
                  HISTÓRICO DA SESSÃO
                </p>

                <h2>Atendimentos finalizados</h2>
              </div>
            </div>

            <div className="fila-table-wrapper">
              <table className="fila-table">
                <thead>
                  <tr>
                    <th>Senha</th>
                    <th>Estudante</th>
                    <th>Data</th>
                    <th>Início</th>
                    <th>Fim</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {historico.map((item) => (
                    <tr key={`${item.senha}-${item.fim}`}>
                      <td>
                        <strong className="table-senha">
                          {item.senha}
                        </strong>
                      </td>

                      <td>{item.estudante}</td>
                      <td>{item.data}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fim}</td>

                      <td>
                        <span className="status-concluido">
                          ✓ Concluído
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="historico-info">
          <div className="notice-icon">i</div>

          <p>
            A ordem da fila deve respeitar a ordem das solicitações
            e os critérios de prioridade definidos para o
            atendimento.
          </p>
        </div>
      </section>
    </main>
  )
}

export default VisualizacaoFila