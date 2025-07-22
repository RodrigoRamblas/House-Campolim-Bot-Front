'use client'

import { useParams } from 'next/navigation'
import { clients } from '../data/clients'
import styles from './ClientLogin.module.scss'
import Image from 'next/image'

export default function ClientLogin() {
  const { clientSlug } = useParams()
  const client = clients.find(c => c.slug === clientSlug)

  if (!client) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h1>Cliente não encontrado</h1>
          <p>O cliente que você está procurando não existe.</p>
          <a href="/clients">Voltar para clientes</a>
        </div>
      </div>
    )
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
        
        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
          
          <div className={styles.links}>
            <a href="#">Esqueceu sua senha?</a>
            <a href="/clients">Voltar</a>
          </div>
        </form>
      </div>
    </div>
  )
}