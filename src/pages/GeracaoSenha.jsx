import { useState } from "react"
import "../App.css"
import { apiFetch } from "../services/api"

function GeracaoSenha() {
  const [demanda, setDemanda] = useState("")
  const [descricao, setDescricao] = useState("")
  const [gerando, setGerando] = useState(false)
  const [erro, setErro] = useState("")
  const [senhaGerada, setSenhaGerada] = useState(null)

  const setorSelecionado = {
    id: 1,
    nome: "Secretaria Acadêmica",
  }

  const estudante = "Ana Silva"

  async function gerarSenha() {
    if (!demanda) {
      setErro("Selecione o tipo de atendimento.")
      return
    }

    try {
      setGerando(true)
      setErro("")
      setSenhaGerada(null)

      const dados = await apiFetch("/api/senhas", {
        method: "POST",
        body: JSON.stringify({
          estudante,
          setorId: setorSelecionado.id,
          prioridade: false,
        }),
      })

      setSenhaGerada(dados.senha)
    } catch (error) {
      setErro(
        error.message || "Não foi possível gerar a senha."
      )
    } finally {
      setGerando(false)
    }
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

      <section className="geracao-container">
        <button className="back-button" type="button">
          ← Voltar
        </button>

        <div className="geracao-header">
          <p className="eyebrow-dashboard">
            SOLICITAR ATENDIMENTO
          </p>

          <h1>Gerar senha de atendimento</h1>

          <p>
            Confira o setor selecionado, informe o tipo de demanda e
            confirme sua solicitação.
          </p>
        </div>

        {senhaGerada && (
          <div className="geracao-warning">
            <div className="notice-icon">✓</div>

            <div>
              <strong>Senha gerada com sucesso!</strong>

              <p>
                Sua senha é{" "}
                <strong>{senhaGerada.codigo}</strong>.
                Você foi incluído na fila de atendimento.
              </p>
            </div>
          </div>
        )}

        {erro && (
          <div className="geracao-warning">
            <div className="notice-icon">!</div>

            <div>
              <strong>
                Não foi possível gerar a senha
              </strong>

              <p>{erro}</p>
            </div>
          </div>
        )}

        <div className="geracao-layout">
          <section className="geracao-form-card">
            <div className="selected-sector">
              <div>
                <span>Setor selecionado</span>

                <strong>
                  {setorSelecionado.nome}
                </strong>
              </div>

              <span className="availability-badge available">
                Disponível
              </span>
            </div>

            <div className="field-group geracao-field">
              <label htmlFor="demanda">
                Tipo de demanda
              </label>

              <select
                id="demanda"
                value={demanda}
                onChange={(event) =>
                  setDemanda(event.target.value)
                }
              >
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
                value={descricao}
                onChange={(event) =>
                  setDescricao(event.target.value)
                }
                placeholder="Descreva brevemente o motivo do atendimento..."
              />
            </div>

            <div className="geracao-warning">
              <div className="notice-icon">i</div>

              <p>
                Após confirmar, o sistema irá gerar automaticamente
                sua senha virtual e inserir você na fila deste setor.
              </p>
            </div>

            <button
              type="button"
              className="dashboard-primary-button geracao-submit"
              onClick={gerarSenha}
              disabled={gerando}
            >
              {gerando
                ? "Gerando senha..."
                : "Confirmar e gerar senha"}
            </button>
          </section>

          <aside className="geracao-summary">
            <p className="panel-overline">
              RESUMO DO ATENDIMENTO
            </p>

            <h2>Antes de confirmar</h2>

            <div className="summary-item">
              <span>Setor</span>

              <strong>
                {setorSelecionado.nome}
              </strong>
            </div>

            <div className="summary-item">
              <span>Estudante</span>

              <strong>{estudante}</strong>
            </div>

            <div className="summary-item">
              <span>Prioridade</span>

              <strong>
                Atendimento normal
              </strong>
            </div>

            <div className="summary-status">
              <span className="status-dot"></span>
              Atendimento disponível
            </div>
          </aside>
        </div>

        {senhaGerada && (
          <section className="geracao-summary">
            <p className="panel-overline">
              ATENDIMENTO SOLICITADO
            </p>

            <h2>Sua senha</h2>

            <div className="summary-item">
              <span>Código da senha</span>

              <strong>
                {senhaGerada.codigo}
              </strong>
            </div>

            <div className="summary-item">
              <span>Status</span>

              <strong>
                {senhaGerada.status === "aguardando"
                  ? "Aguardando atendimento"
                  : senhaGerada.status}
              </strong>
            </div>

            <div className="summary-item">
              <span>Setor</span>

              <strong>
                {setorSelecionado.nome}
              </strong>
            </div>

            <div className="summary-status">
              <span className="status-dot"></span>
              Senha registrada na fila
            </div>
          </section>
        )}

        <div className="geracao-warning">
          <div className="notice-icon">✓</div>

          <p>
            A geração da senha está integrada à API do EduFila.
            Ao confirmar, a solicitação é registrada diretamente
            no backend.
          </p>
        </div>
      </section>
    </main>
  )
}

export default GeracaoSenha