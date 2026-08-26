function Mensagem({ tipo = "erro", titulo, mensagem, onClose }) {
  const icones = {
    erro: "!",
    sucesso: "✓",
    aviso: "!",
    info: "i",
  }

  return (
    <div className={`mensagem mensagem-${tipo}`} role="alert">
      <div className="mensagem-icone">
        {icones[tipo]}
      </div>

      <div className="mensagem-conteudo">
        {titulo && <strong>{titulo}</strong>}
        <p>{mensagem}</p>
      </div>

      {onClose && (
        <button
          className="mensagem-fechar"
          type="button"
          onClick={onClose}
          aria-label="Fechar mensagem"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Mensagem