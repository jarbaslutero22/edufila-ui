import { useEffect, useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

const descricoesSetores = {
  "Secretaria Acadêmica":
    "Documentos, matrícula e informações acadêmicas.",

  "Coordenação do Curso":
    "Orientações acadêmicas e assuntos relacionados ao curso.",

  "Atendimento ao Estudante":
    "Dúvidas gerais e suporte aos serviços acadêmicos.",

  "Setor Administrativo":
    "Solicitações e orientações administrativas.",
}

function EscolhaSetor() {
  const [setores, setSetores] = useState([])
  const [fila, setFila] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true)
        setErro("")

        const [dadosSetores, dadosFila] = await Promise.all([
          apiFetch("/api/setores"),
          apiFetch("/api/fila"),
        ])

        const listaSetores = Array.isArray(dadosSetores)
          ? dadosSetores
          : dadosSetores.setores || []

        setSetores(listaSetores)
        setFila(dadosFila.fila || [])
      } catch (error) {
        setErro(
          error.message || "Não foi possível carregar os setores."
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [])

  function obterQuantidadeNaFila(setorId) {
    return fila.filter(
      (item) =>
        item.setorId === setorId &&
        item.status === "aguardando"
    ).length
  }

  function obterEspera(setorId) {
    const quantidade = obterQuantidadeNaFila(setorId)

    if (quantidade === 0) {
      return "Sem espera"
    }

    const minutos = quantidade * 4

    return `≈ ${minutos} min`
  }

  function obterDescricao(nome) {
    return (
      descricoesSetores[nome] ||
      "Atendimento e suporte aos serviços acadêmicos."
    )
  }

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

          <p className="eyebrow-dashboard">
            SOLICITAR ATENDIMENTO
          </p>

          <h1>Escolha o setor</h1>

          <p>
            Selecione o setor responsável pelo atendimento que você precisa.
          </p>
        </div>

        {carregando && (
          <div className="setor-notice">
            <div className="notice-icon">...</div>

            <div>
              <strong>Carregando setores</strong>

              <p>
                Consultando os setores disponíveis no EduFila.
              </p>
            </div>
          </div>
        )}

        {erro && (
          <div className="setor-notice">
            <div className="notice-icon">!</div>

            <div>
              <strong>Não foi possível carregar os setores</strong>

              <p>{erro}</p>
            </div>
          </div>
        )}

        {!carregando && !erro && (
          <>
            <section className="setores-grid">
              {setores.length === 0 && (
                <div className="setor-notice">
                  <div className="notice-icon">!</div>

                  <div>
                    <strong>Nenhum setor cadastrado</strong>

                    <p>
                      Não existem setores disponíveis para atendimento.
                    </p>
                  </div>
                </div>
              )}

              {setores.map((setor) => {
                const quantidadeFila =
                  obterQuantidadeNaFila(setor.id)

                const espera = obterEspera(setor.id)

                return (
                  <article
                    key={setor.id}
                    className="setor-card"
                  >
                    <div className="setor-card-top">
                      <div className="setor-icon">▦</div>

                      <span className="availability-badge available">
                        Disponível
                      </span>
                    </div>

                    <h2>{setor.nome}</h2>

                    <p>
                      {obterDescricao(setor.nome)}
                    </p>

                    <div className="setor-info">
                      <div>
                        <span>Pessoas na fila</span>

                        <strong>
                          {quantidadeFila}
                        </strong>
                      </div>

                      <div>
                        <span>Espera estimada</span>

                        <strong>
                          {espera}
                        </strong>
                      </div>
                    </div>

                    <button
                      className="setor-button"
                      type="button"
                    >
                      Selecionar setor
                    </button>
                  </article>
                )
              })}
            </section>

            <div className="setor-notice">
              <div className="notice-icon">i</div>

              <div>
                <strong>Como funciona?</strong>

                <p>
                  Após escolher o setor, você poderá informar o tipo de
                  demanda e confirmar a solicitação. O EduFila gerará
                  automaticamente sua senha virtual e sua posição na fila.
                </p>
              </div>
            </div>

            <div className="setor-notice">
              <div className="notice-icon">✓</div>

              <div>
                <strong>API integrada com sucesso</strong>

                <p>
                  Os setores e a quantidade de pessoas na fila estão sendo
                  carregados diretamente da API do EduFila.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default EscolhaSetor