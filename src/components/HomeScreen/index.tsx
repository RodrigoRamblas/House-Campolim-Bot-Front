'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { enableProxy, disableProxy } from '@/services/proxy'
import styles from './HomeScreen.module.scss'
import Image from 'next/image'

interface Client {
  id: string
  name: string
  slug: string
  logo?: string
  description: string
}

interface HomeScreenProps {
  client: Client
}

export default function HomeScreen({ client }: HomeScreenProps) {
  const router = useRouter()
  const { clientSlug } = useParams()
  const [proxyEnabled, setProxyEnabled] = useState(false)
  const [proxyLoading, setProxyLoading] = useState(false)
  const [proxyError, setProxyError] = useState('')

  // Load proxy state from cookie on component mount
  useEffect(() => {
    const savedProxyState = document.cookie
      .split('; ')
      .find(row => row.startsWith('proxyEnabled='))
      ?.split('=')[1]
    
    if (savedProxyState !== undefined) {
      setProxyEnabled(savedProxyState === 'true')
    }
  }, [])

  // Persist proxy state in a cookie so the preference survives reloads.
  const persistProxyState = (enabled: boolean) => {
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    document.cookie = `proxyEnabled=${enabled}; expires=${expirationDate.toUTCString()}; path=/`
  }

  const handleProxyToggle = async (enabled: boolean) => {
    if (proxyLoading) {
      return
    }

    setProxyError('')
    const previousState = proxyEnabled
    setProxyEnabled(enabled)
    setProxyLoading(true)

    const slug = typeof clientSlug === 'string'
      ? clientSlug
      : Array.isArray(clientSlug)
        ? clientSlug[0]
        : undefined

    try {
      const options = slug ? { clientSlug: slug } : undefined

      if (enabled) {
        await enableProxy(options)
      } else {
        await disableProxy(options)
      }

      persistProxyState(enabled)
    } catch (error) {
      setProxyEnabled(previousState)
      persistProxyState(previousState)
      setProxyError(error instanceof Error ? error.message : 'Não foi possível atualizar o proxy.')
    } finally {
      setProxyLoading(false)
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
    router.push(`/${clientSlug}`)
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.clientInfo}>
            {client.logo && (
              <Image 
                src={client.logo} 
                alt={`Logo ${client.name}`} 
                width={50} 
                height={50}
                className={styles.logo}
              />
            )}
            <h1>{client.name}</h1>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <h2>Bem-vindo ao Painel</h2>
          <p>Selecione uma opção abaixo para começar</p>
        </div>
        
        <div className={styles.optionsGrid}>
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🎧</span>
            </div>
            <h3>Support</h3>
            <p>Obtenha ajuda e suporte técnico</p>
            <button className={styles.optionButton}>
              Acessar Support
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>⚙️</span>
            </div>
            <h3>Settings</h3>
            <p>Gerencie suas preferências e configurações</p>
            <button className={styles.optionButton}>
              Abrir Settings
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🌐</span>
            </div>
            <h3>Proxy Reverso</h3>
            <p>Ative o proxy reverso</p>
            <div className={styles.proxyToggle}>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={proxyEnabled}
                  onChange={(e) => { void handleProxyToggle(e.target.checked) }}
                  disabled={proxyLoading}
                  aria-label="Alternar proxy reverso"
                />
                <span className={styles.slider}></span>
              </label>
              <span className={styles.toggleLabel}>
                {proxyLoading ? '...' : proxyEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            {proxyError && (
              <p className={styles.proxyStatusError}>{proxyError}</p>
            )}
          </div>
        </div>
        
        {clientSlug === 'house-campolim' && (
          <div className={styles.proxyImageContainer}>
            <Image
              src={proxyEnabled ? '/image/clients/housecampolim/proxy-on.png' : '/image/clients/housecampolim/proxy-off.png'}
              alt={proxyEnabled ? 'Proxy Ativo' : 'Proxy Inativo'}
              width={900}
              height={600}
              className={styles.proxyImage}
            />
          </div>
        )}
      </main>
    </div>
  )
}