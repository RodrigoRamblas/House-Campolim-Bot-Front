export interface Rule {
  id: number
  tag: string
  original_text: string
  replacement: string
  action: string
  created_at?: string
  updated_at?: string
}

export interface RulePayload {
  tag: string
  originalText: string
  replacement: string
  action: string
}

interface FetchRulesParams {
  skip?: number
  limit?: number
}

function getAuthHeaders() {
  if (typeof window === 'undefined') {
    throw new Error('As regras só podem ser manipuladas no navegador.')
  }

  const token = window.localStorage.getItem('token')
  const tokenType = window.localStorage.getItem('tokenType') || 'Bearer'

  if (!token) {
    throw new Error('Token não encontrado. Faça login novamente para continuar.')
  }

  return {
    Authorization: `${tokenType} ${token}`,
  }
}

export async function fetchRules({ skip = 0, limit = 100 }: FetchRulesParams = {}): Promise<Rule[]> {
  const headers = {
    Accept: 'application/json',
    ...getAuthHeaders(),
  }

  const query = `?skip=${encodeURIComponent(skip)}&limit=${encodeURIComponent(limit)}`
  const response = await fetch(`/api/v1/rules${query}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Não foi possível carregar as regras.')
  }

  const data = await response.json()
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  return []
}

export async function createRule(payload: RulePayload) {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  }

  const body = {
    tag: payload.tag,
    original_text: payload.originalText,
    replacement: payload.replacement,
    action: payload.action,
  }

  const response = await fetch('/api/v1/rules', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let message = 'Não foi possível criar a regra.'

    try {
      const errorData = await response.json()
      if (errorData?.detail) {
        message = `${message} ${errorData.detail}`
      }
    } catch {
      const fallback = await response.text()
      if (fallback) {
        message = `${message} ${fallback}`
      }
    }

    throw new Error(message)
  }

  return response.json()
}

export async function updateRule(id: number, payload: RulePayload) {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  }

  const body = {
    tag: payload.tag,
    original_text: payload.originalText,
    replacement: payload.replacement,
    action: payload.action,
  }

  const response = await fetch(`/api/v1/rules/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let message = 'Não foi possível atualizar a regra.'

    try {
      const errorData = await response.json()
      if (errorData?.detail) {
        message = `${message} ${errorData.detail}`
      }
    } catch {
      const fallback = await response.text()
      if (fallback) {
        message = `${message} ${fallback}`
      }
    }

    throw new Error(message)
  }

  return response.json()
}

export async function deleteRule(id: number) {
  const headers: HeadersInit = {
    Accept: 'application/json',
    ...getAuthHeaders(),
  }

  const response = await fetch(`/api/v1/rules/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    let message = 'Não foi possível remover a regra.'

    try {
      const errorData = await response.json()
      if (errorData?.detail) {
        message = `${message} ${errorData.detail}`
      }
    } catch {
      const fallback = await response.text()
      if (fallback) {
        message = `${message} ${fallback}`
      }
    }

    throw new Error(message)
  }
}
