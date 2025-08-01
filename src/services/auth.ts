interface LoginResponse {
  access_token: string
  token_type: string
}

interface LoginCredentials {
  username: string
  password: string
  client: string
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const formData = new URLSearchParams()
  formData.append('grant_type', 'password')
  formData.append('username', credentials.username)
  formData.append('password', credentials.password)
  formData.append('scope', '')
  formData.append('client_id', 'string')
  formData.append('client_secret', '********')

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Login failed')
  }

  return response.json()
}