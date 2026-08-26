import "../App.css"

function PainelAdministrativo() {
  const usuarios = [
    {
      nome: "Ana Carolina",
      email: "ana@edufila.com",
      perfil: "Estudante",
      status: "Ativo",
    },
    {
      nome: "Carlos Alberto",
      email: "carlos@edufila.com",
      perfil: "Servidor",
      status: "Ativo",
    },
    {
      nome: "Mariana Costa",
      email: "mariana@edufila.com",
      perfil: "Administrador",
      status: "Ativo",
    },
  ]

  const setores = [
    {
      nome: "Secretaria Acadêmica",
      servidores: 3,
      status: "Ativo",
    },
    {
      nome: "Coordenação do Curso",
      servidores: 2,
      status: "Ativo",
    },
    {
      nome: "Atendimento ao Estudante",
      servidores: 2,
      status: "Ativo",
    },
    {
      nome: "Setor Administrativo",
      servidores: 1,
      status: "Inativo",
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
            <strong>Administrador</strong>
            <span>Gestão do sistema</span>
          </div>

          <div className="user-avatar">A</div>
        </div>
      </header>

      <section className="admin-container">
        <div className="admin-heading">
          <div>
            <p className="eyebrow-dashboard">
              PAINEL ADMINISTRATIVO
            </p>

            <h1>Gestão do EduFila</h1>

            <p>
              Gerencie usuários, setores e configurações básicas
              de acesso ao sistema.
            </p>
          </div>
        </div>

        <section className="admin-cards">
          <article className="info-card">
            <span className="card-label">
              Usuários cadastrados
            </span>

            <strong>{usuarios.length}</strong>

            <p>Usuários disponíveis no sistema.</p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Setores cadastrados
            </span>

            <strong>{setores.length}</strong>

            <p>Setores configurados no EduFila.</p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Servidores
            </span>

            <strong>
              {
                usuarios.filter(
                  (usuario) => usuario.perfil === "Servidor"
                ).length
              }
            </strong>

            <p>Servidores com acesso ao atendimento.</p>
          </article>

          <article className="info-card">
            <span className="card-label">
              Administradores
            </span>

            <strong>
              {
                usuarios.filter(
                  (usuario) =>
                    usuario.perfil === "Administrador"
                ).length
              }
            </strong>

            <p>Usuários com acesso administrativo.</p>
          </article>
        </section>

        <section className="admin-grid">
          <article className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="panel-overline">
                  USUÁRIOS
                </p>

                <h2>Gerenciar usuários</h2>
              </div>

              <button
                className="dashboard-primary-button"
                type="button"
              >
                Novo usuário
              </button>
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
                    <tr key={usuario.email}>
                      <td>
                        <strong>
                          {usuario.nome}
                        </strong>
                      </td>

                      <td>{usuario.email}</td>

                      <td>
                        <span className="admin-profile-badge">
                          {usuario.perfil}
                        </span>
                      </td>

                      <td>
                        <span className="admin-status-active">
                          {usuario.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-actions">
                          <button
                            className="action-button"
                            type="button"
                          >
                            Editar
                          </button>

                          <button
                            className="action-button"
                            type="button"
                          >
                            Acesso
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="panel-overline">
                  SETORES
                </p>

                <h2>Gerenciar setores</h2>
              </div>

              <button
                className="dashboard-primary-button"
                type="button"
              >
                Novo setor
              </button>
            </div>

            <div className="setores-admin-grid">
              {setores.map((setor) => (
                <article
                  className="admin-sector-card"
                  key={setor.nome}
                >
                  <div>
                    <strong>{setor.nome}</strong>

                    <span>
                      {setor.servidores} servidor(es)
                    </span>
                  </div>

                  <div className="admin-sector-footer">
                    <span
                      className={
                        setor.status === "Ativo"
                          ? "admin-status-active"
                          : "admin-status-inactive"
                      }
                    >
                      {setor.status}
                    </span>

                    <button
                      className="action-button"
                      type="button"
                    >
                      Gerenciar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="admin-access-panel">
          <div>
            <p className="panel-overline">
              CONTROLE DE ACESSO
            </p>

            <h2>Perfis do sistema</h2>

            <p>
              O EduFila possui diferentes níveis de acesso de
              acordo com o perfil do usuário.
            </p>
          </div>

          <div className="admin-access-grid">
            <article>
              <strong>Estudante</strong>
              <span>
                Solicitação e acompanhamento de atendimentos.
              </span>
            </article>

            <article>
              <strong>Servidor</strong>
              <span>
                Gerenciamento das filas e atendimentos.
              </span>
            </article>

            <article>
              <strong>Administrador</strong>
              <span>
                Gerenciamento de usuários e setores.
              </span>
            </article>
          </div>
        </section>
      </section>
    </main>
  )
}

export default PainelAdministrativo