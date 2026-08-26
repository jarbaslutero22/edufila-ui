import { useState } from "react"
import "../App.css"

function GerenciamentoUsuarios() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "Ana Carolina",
      email: "ana@edufila.com",
      perfil: "Estudante",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Carlos Alberto",
      email: "carlos@edufila.com",
      perfil: "Servidor",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Mariana Costa",
      email: "mariana@edufila.com",
      perfil: "Administrador",
      status: "Ativo",
    },
  ])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [perfil, setPerfil] = useState("Estudante")

  function adicionarUsuario(event) {
    event.preventDefault()

    if (!nome.trim() || !email.trim()) {
      alert("Preencha nome e e-mail.")
      return
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      perfil,
      status: "Ativo",
    }

    setUsuarios((usuariosAtuais) => [
      ...usuariosAtuais,
      novoUsuario,
    ])

    setNome("")
    setEmail("")
    setPerfil("Estudante")
  }

  function alterarStatus(id) {
    setUsuarios((usuariosAtuais) =>
      usuariosAtuais.map((usuario) =>
        usuario.id === id
          ? {
              ...usuario,
              status:
                usuario.status === "Ativo"
                  ? "Inativo"
                  : "Ativo",
            }
          : usuario
      )
    )
  }

  function removerUsuario(id) {
    const confirmar = window.confirm(
      "Deseja realmente remover este usuário?"
    )

    if (!confirmar) {
      return
    }

    setUsuarios((usuariosAtuais) =>
      usuariosAtuais.filter(
        (usuario) => usuario.id !== id
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

            <h1>Gerenciamento de usuários</h1>

            <p>
              Cadastre usuários, defina seus perfis de acesso
              e controle a situação de cada conta.
            </p>
          </div>

          <div className="management-count">
            <span>Usuários</span>
            <strong>{usuarios.length}</strong>
          </div>
        </div>

        <section className="management-form-card">
          <div>
            <p className="panel-overline">
              NOVO USUÁRIO
            </p>

            <h2>Cadastrar usuário</h2>
          </div>

          <form
            className="management-form"
            onSubmit={adicionarUsuario}
          >
            <div className="field-group">
              <label htmlFor="usuario-nome">
                Nome
              </label>

              <input
                id="usuario-nome"
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
              />
            </div>

            <div className="field-group">
              <label htmlFor="usuario-email">
                E-mail
              </label>

              <input
                id="usuario-email"
                type="email"
                placeholder="usuario@exemplo.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>

            <div className="field-group">
              <label htmlFor="usuario-perfil">
                Perfil
              </label>

              <select
                id="usuario-perfil"
                value={perfil}
                onChange={(event) =>
                  setPerfil(event.target.value)
                }
              >
                <option>Estudante</option>
                <option>Servidor</option>
                <option>Administrador</option>
              </select>
            </div>

            <button
              className="dashboard-primary-button"
              type="submit"
            >
              Cadastrar usuário
            </button>
          </form>
        </section>

        <section className="management-table-card">
          <div className="management-table-heading">
            <div>
              <p className="panel-overline">
                USUÁRIOS CADASTRADOS
              </p>

              <h2>Contas do sistema</h2>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <strong>{usuario.nome}</strong>
                    </td>

                    <td>{usuario.email}</td>

                    <td>
                      <span className="admin-profile-badge">
                        {usuario.perfil}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          usuario.status === "Ativo"
                            ? "admin-status-active"
                            : "admin-status-inactive"
                        }
                      >
                        {usuario.status}
                      </span>
                    </td>

                    <td>
                      <div className="admin-actions">
                        <button
                          className="action-button"
                          type="button"
                          onClick={() =>
                            alterarStatus(usuario.id)
                          }
                        >
                          {usuario.status === "Ativo"
                            ? "Desativar"
                            : "Ativar"}
                        </button>

                        <button
                          className="action-button danger-action"
                          type="button"
                          onClick={() =>
                            removerUsuario(usuario.id)
                          }
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

export default GerenciamentoUsuarios