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

  const response = await fetch('/api/v1/token', {
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