const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.mensagem ||
      data?.message ||
      "Erro ao acessar a API"
    )
  }

  return data
}
