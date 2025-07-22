'use client'

import Image from 'next/image'
import Menu from '../../components/menu/page'
import styles from './Home.module.scss'

const cards = [
  {
    title: 'Casa Moderna',
    description: 'Design contemporâneo com acabamento premium',
    image: '/image/home/house.svg'
  },
  {
    title: 'Apartamento Luxo',
    description: 'Vista panorâmica e localização privilegiada',
    image: '/image/home/apartament.svg'
  },
  {
    title: 'Casa com Piscina',
    description: 'Área de lazer completa para sua família',
    image: '/image/home/house-with-pool.svg'
  },
  {
    title: 'Cobertura Duplex',
    description: 'Espaço e sofisticação em cada detalhe',
    image: '/image/home/duplex-penthouse.svg'
  },
  {
    title: 'Casa em Condomínio',
    description: 'Segurança e conforto para sua família',
    image: '/image/home/house-in-condominium.svg'
  }
]

export default function Home() {
  return (
    <>
      <Menu />
      <main className={styles.container}>
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardImageContainer}>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={300}
                  height={300}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}