import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"
import { apiFetch } from "../services/api"

function Cadastro() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [matricula, setMatricula] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setErro("")
    setSucesso("")

    if (!nome.trim()) {
      setErro("Informe seu nome completo.")
      return
    }

    if (!email.trim()) {
      setErro("Informe seu e-mail.")
      return
    }

    if (!senha) {
      setErro("Informe uma senha.")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve possuir pelo menos 6 caracteres.")
      return
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.")
      return
    }

    try {
      setCarregando(true)

      const dados = await apiFetch("/api/usuarios", {
        method: "POST",
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha,
          perfil: "estudante",
        }),
      })

      setSucesso(
        dados?.mensagem ||
          "Conta criada com sucesso! Você já pode entrar no EduFila."
      )

      setNome("")
      setCpf("")
      setMatricula("")
      setEmail("")
      setSenha("")
      setConfirmarSenha("")
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível criar sua conta."
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
              Cadastre-se para solicitar atendimentos, acompanhar sua
              posição na fila e consultar seu histórico.
            </p>
          </div>

          <div className="brand-footer">
            <span className="status-dot"></span>
            Sistema de gerenciamento de filas
          </div>
        </aside>

        <section className="login-content cadastro-content">
          <div className="login-header">
            <span className="mobile-logo">
              EduFila
            </span>

            <h2>Criar conta</h2>

            <p>
              Preencha seus dados para acessar o EduFila.
            </p>
          </div>

          {erro && (
            <div className="geracao-warning">
              <div className="notice-icon">!</div>

              <div>
                <strong>
                  Não foi possível criar a conta
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
                  Cadastro realizado com sucesso!
                </strong>

                <p>{sucesso}</p>
              </div>
            </div>
          )}

          <form
            className="login-form cadastro-form"
            onSubmit={handleSubmit}
          >
            <div className="field-group">
              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="cpf">
                  CPF
                </label>

                <input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(event) =>
                    setCpf(event.target.value)
                  }
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="field-group">
                <label htmlFor="matricula">
                  Matrícula
                </label>

                <input
                  id="matricula"
                  type="text"
                  value={matricula}
                  onChange={(event) =>
                    setMatricula(event.target.value)
                  }
                  placeholder="Digite sua matrícula"
                />
              </div>
            </div>

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

            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="senha">
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(event) =>
                    setSenha(event.target.value)
                  }
                  placeholder="Crie uma senha"
                />
              </div>

              <div className="field-group">
                <label htmlFor="confirmarSenha">
                  Confirmar senha
                </label>

                <input
                  id="confirmarSenha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(event) =>
                    setConfirmarSenha(event.target.value)
                  }
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <button
              className="primary-button"
              type="submit"
              disabled={carregando}
            >
              {carregando
                ? "Criando conta..."
                : "Criar conta"}
            </button>
          </form>

          <div className="signup-area">
            <span>
              Já possui uma conta?
            </span>

            <button
              type="button"
              className="signup-button"
              onClick={() => navigate("/login")}
            >
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