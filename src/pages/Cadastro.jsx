import "../App.css"

function Cadastro() {
  return (
    <main className="login-page">
      <section className="login-shell">
        <aside className="login-brand">
          <div className="brand-badge">EF</div>

          <div>
            <p className="eyebrow">ATENDIMENTO ACADÊMICO</p>
            <h1>EduFila</h1>
            <p className="brand-text">
              Cadastre-se para solicitar atendimentos, acompanhar sua posição
              na fila e consultar seu histórico.
            </p>
          </div>

          <div className="brand-footer">
            <span className="status-dot"></span>
            Sistema de gerenciamento de filas
          </div>
        </aside>

        <section className="login-content cadastro-content">
          <div className="login-header">
            <span className="mobile-logo">EduFila</span>
            <h2>Criar conta</h2>
            <p>Preencha seus dados para acessar o EduFila.</p>
          </div>

          <form className="login-form cadastro-form">
            <div className="field-group">
              <label htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="field-group">
                <label htmlFor="matricula">Matrícula</label>
                <input
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="Crie uma senha"
                />
              </div>

              <div className="field-group">
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <input
                  id="confirmarSenha"
                  type="password"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              Criar conta
            </button>
          </form>

          <div className="signup-area">
            <span>Já possui uma conta?</span>
            <button type="button" className="signup-button">
              Entrar
            </button>
          </div>

          <p className="security-text">
            Seus dados serão utilizados apenas para acesso ao EduFila.
          </p>
        </section>
      </section>
    </main>
  )
}

export default Cadastro