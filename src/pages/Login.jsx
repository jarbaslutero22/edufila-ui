import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"
import { apiFetch } from "../services/api"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setErro("")
    setSucesso("")

    if (!email.trim()) {
      setErro("Informe seu e-mail.")
      return
    }

    if (!senha) {
      setErro("Informe sua senha.")
      return
    }

    try {
      setCarregando(true)

      const dados = await apiFetch("/api/usuarios/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          senha,
        }),
      })

      if (dados.usuario) {
        localStorage.setItem(
          "edufila_usuario",
          JSON.stringify(dados.usuario)
        )
      }

      setSucesso(
        dados.mensagem ||
          "Login realizado com sucesso!"
      )

      setTimeout(() => {
        navigate("/estudante")
      }, 700)
    } catch (error) {
      setErro(
        error.message ||
          "E-mail ou senha inválidos."
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <aside className="login-brand">
          <div className="brand-badge">EF</div>

          <div>
            <p className="eyebrow">
              ATENDIMENTO ACADÊMICO
            </p>

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
            <span className="mobile-logo">
              EduFila
            </span>

            <h2>Bem-vindo</h2>

            <p>
              Entre com seus dados para acessar o sistema.
            </p>
          </div>

          {erro && (
            <div className="geracao-warning">
              <div className="notice-icon">!</div>

              <div>
                <strong>
                  Não foi possível entrar
                </strong>

                <p>{erro}</p>
              </div>
            </div>
          )}

          {sucesso && (
            <div className="geracao-warning">
              <div className="notice-icon">✓</div>

              <div>
                <strong>
                  Login realizado com sucesso!
                </strong>

                <p>{sucesso}</p>
              </div>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="field-group">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className="field-group">
              <div className="field-row">
                <label htmlFor="password">
                  Senha
                </label>

                <button
                  className="link-button"
                  type="button"
                >
                  Esqueci minha senha
                </button>
              </div>

              <input
                id="password"
                type="password"
                value={senha}
                onChange={(event) =>
                  setSenha(event.target.value)
                }
                placeholder="Digite sua senha"
              />
            </div>

            <button
              className="primary-button"
              type="submit"
              disabled={carregando}
            >
              {carregando
                ? "Entrando..."
                : "Entrar"}
            </button>
          </form>

          <div className="signup-area">
            <span>
              Não possui uma conta?
            </span>

            <button
              type="button"
              className="signup-button"
              onClick={() => navigate("/cadastro")}
            >
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