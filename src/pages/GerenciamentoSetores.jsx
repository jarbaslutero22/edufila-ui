import { useState } from "react"
import "../App.css"

function GerenciamentoSetores() {
  const [setores, setSetores] = useState([
    {
      id: 1,
      nome: "Secretaria Acadêmica",
      descricao: "Documentos e serviços acadêmicos.",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Coordenação do Curso",
      descricao: "Orientações relacionadas ao curso.",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Atendimento ao Estudante",
      descricao: "Suporte e informações acadêmicas.",
      status: "Ativo",
    },
  ])

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

  function adicionarSetor(event) {
    event.preventDefault()

    if (!nome.trim()) {
      alert("Informe o nome do setor.")
      return
    }

    const novoSetor = {
      id: Date.now(),
      nome,
      descricao:
        descricao || "Sem descrição informada.",
      status: "Ativo",
    }

    setSetores((setoresAtuais) => [
      ...setoresAtuais,
      novoSetor,
    ])

    setNome("")
    setDescricao("")
  }

  function alterarStatus(id) {
    setSetores((setoresAtuais) =>
      setoresAtuais.map((setor) =>
        setor.id === id
          ? {
              ...setor,
              status:
                setor.status === "Ativo"
                  ? "Inativo"
                  : "Ativo",
            }
          : setor
      )
    )
  }

  function removerSetor(id) {
    const confirmar = window.confirm(
      "Deseja realmente remover este setor?"
    )

    if (!confirmar) {
      return
    }

    setSetores((setoresAtuais) =>
      setoresAtuais.filter(
        (setor) => setor.id !== id
      )
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
            <strong>Administrador</strong>
            <span>Gestão do sistema</span>
          </div>

          <div className="user-avatar">A</div>
        </div>
      </header>

      <section className="management-container">
        <button className="back-button" type="button">
          ← Voltar ao painel
        </button>

        <div className="management-heading">
          <div>
            <p className="eyebrow-dashboard">
              ADMINISTRAÇÃO
            </p>

            <h1>Gerenciamento de setores</h1>

            <p>
              Cadastre e controle os setores responsáveis
              pelos atendimentos acadêmicos.
            </p>
          </div>

          <div className="management-count">
            <span>Setores</span>
            <strong>{setores.length}</strong>
          </div>
        </div>

        <section className="management-form-card">
          <div>
            <p className="panel-overline">
              NOVO SETOR
            </p>

            <h2>Cadastrar setor</h2>
          </div>

          <form
            className="management-form setores-form"
            onSubmit={adicionarSetor}
          >
            <div className="field-group">
              <label htmlFor="setor-nome">
                Nome do setor
              </label>

              <input
                id="setor-nome"
                type="text"
                placeholder="Ex.: Secretaria Acadêmica"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
              />
            </div>

            <div className="field-group">
              <label htmlFor="setor-descricao">
                Descrição
              </label>

              <input
                id="setor-descricao"
                type="text"
                placeholder="Descrição do atendimento"
                value={descricao}
                onChange={(event) =>
                  setDescricao(event.target.value)
                }
              />
            </div>

            <button
              className="dashboard-primary-button"
              type="submit"
            >
              Cadastrar setor
            </button>
          </form>
        </section>

        <section className="management-table-card">
          <div className="management-table-heading">
            <div>
              <p className="panel-overline">
                SETORES CADASTRADOS
              </p>

              <h2>Setores de atendimento</h2>
            </div>
          </div>

          <div className="setores-management-grid">
            {setores.map((setor) => (
              <article
                className="management-sector-card"
                key={setor.id}
              >
                <div className="management-sector-top">
                  <div className="setor-icon">
                    ▦
                  </div>

                  <span
                    className={
                      setor.status === "Ativo"
                        ? "admin-status-active"
                        : "admin-status-inactive"
                    }
                  >
                    {setor.status}
                  </span>
                </div>

                <h3>{setor.nome}</h3>

                <p>{setor.descricao}</p>

                <div className="management-sector-actions">
                  <button
                    className="action-button"
                    type="button"
                    onClick={() =>
                      alterarStatus(setor.id)
                    }
                  >
                    {setor.status === "Ativo"
                      ? "Desativar"
                      : "Ativar"}
                  </button>

                  <button
                    className="action-button danger-action"
                    type="button"
                    onClick={() =>
                      removerSetor(setor.id)
                    }
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default GerenciamentoSetores