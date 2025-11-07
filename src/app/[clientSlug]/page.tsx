'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { clients } from '../data/clients' 
import styles from './ClientLogin.module.scss'
import Image from 'next/image'
import { login } from '@/services/auth'

export default function ClientLogin() {
  const { clientSlug } = useParams()
  const router = useRouter()
  const client = clients.find(c => c.slug === clientSlug)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!client) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h1>Cliente não encontrado</h1>
          <p>O cliente que você está procurando não existe.</p>
          <Link href="/clients">
            Voltar para clientes
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login({
        username: formData.email,
        password: formData.password,
        client: clientSlug as string
      })

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('tokenType', response.token_type)
      
      router.push(`/${clientSlug}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {client.logo && (
          <div className={styles.logoWrapper}>
            <Image 
              src={client.logo} 
              alt={`Logo ${client.name}`} 
              width={200} 
              height={200} 
            />
          </div>
        )}
        <h1 className={styles.name}>{client.name}</h1>
        <p className={styles.description}>{client.description}</p>
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required 
            />
          </div>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <div className={styles.links}>
            <Link href="#">
              Esqueceu sua senha?
            </Link>
            <Link href="/clients">
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}