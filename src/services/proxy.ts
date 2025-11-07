interface ToggleOptions {
  clientSlug?: string
}

type ProxyAction = 'enable' | 'disable'

async function proxyRequest(action: ProxyAction, options?: ToggleOptions) {
  if (typeof window === 'undefined') {
    throw new Error('Proxy actions só podem ser executadas no navegador.')
  }

  const token = window.localStorage.getItem('token')
  const tokenType = window.localStorage.getItem('tokenType') || 'Bearer'

  if (!token) {
    throw new Error('Token de autenticação não encontrado. Faça login novamente.')
  }

  const endpoint = `/api/v1/proxy/${action}`
  const body = options?.clientSlug ? JSON.stringify({ client_slug: options.clientSlug }) : undefined

  const headers: HeadersInit = {
    Accept: 'application/json',
    Authorization: `${tokenType} ${token}`,
  }

  if (body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body,
    cache: 'no-store',
  })

  if (!response.ok) {
    let message = `Não foi possível ${action === 'enable' ? 'ativar' : 'desativar'} o proxy.`

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

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return undefined
}

export function enableProxy(options?: ToggleOptions) {
  return proxyRequest('enable', options)
}

export function disableProxy(options?: ToggleOptions) {
  return proxyRequest('disable', options)
}
