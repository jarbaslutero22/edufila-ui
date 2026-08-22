import "../App.css"

function Login() {
  return (
    <main className="login-page">
      <section className="login-shell">
        <aside className="login-brand">
          <div className="brand-badge">EF</div>

          <div>
            <p className="eyebrow">ATENDIMENTO ACADÊMICO</p>
            <h1>EduFila</h1>
            <p className="brand-text">
              Atendimento mais organizado, transparente e eficiente para
              estudantes e instituições.
            </p>
          </div>

          <div className="brand-footer">
            <span className="status-dot"></span>
            Sistema de gerenciamento de filas
          </div>
        </aside>

        <section className="login-content">
          <div className="login-header">
            <span className="mobile-logo">EduFila</span>
            <h2>Bem-vindo</h2>
            <p>Entre com seus dados para acessar o sistema.</p>
          </div>

          <form className="login-form">
            <div className="field-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className="field-group">
              <div className="field-row">
                <label htmlFor="password">Senha</label>
                <button className="link-button" type="button">
                  Esqueci minha senha
                </button>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>

            <button className="primary-button" type="submit">
              Entrar
            </button>
          </form>

          <div className="signup-area">
            <span>Não possui uma conta?</span>
            <button type="button" className="signup-button">
              Cadastre-se
            </button>
          </div>

          <p className="security-text">
            Acesso protegido e exclusivo para usuários cadastrados.
          </p>
        </section>
      </section>
    </main>
  )
}

export default Login