'use client'

import { useRouter } from 'next/navigation'
import Menu from '../../components/menu/page'
import styles from './Clients.module.scss'
import { clients } from '../data/clients'
import Image from 'next/image'

export default function Clients() {
  const router = useRouter()

  const handleClientClick = (slug: string) => {
    router.push(`/${slug}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent, slug: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClientClick(slug)
    }
  }

  return (
    <>
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.title}>Nossos Clientes</h1>
        <div className={styles.cardGrid}>
          {clients.map((client) => (
            <div 
              key={client.id} 
              className={styles.card}
              onClick={() => handleClientClick(client.slug)}
              onKeyPress={(e) => handleKeyPress(e, client.slug)}
              role="button"
              tabIndex={0}
              aria-label={`Acessar página de ${client.name}`}
            >
              {client.logo && (
                <div className={styles.cardLogo}>
                  <Image 
                    src={client.logo} 
                    alt={`Logo ${client.name}`}
                    width={200}
                    height={80}
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{client.name}</h2>
                <p className={styles.cardDescription}>{client.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}