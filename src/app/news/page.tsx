'use client'

import Menu from '@/components/menu/page'
import styles from './News.module.scss'

const newsData = [
  {
    id: 1,
    title: 'Tendências do mercado imobiliário em 2025',
    summary: 'As mudanças sociais, culturais e tecnológicas moldam o setor imobiliário. Sustentabilidade, digitalização e novos modelos de moradia como Flex Living são as grandes apostas para o ano.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 2,
    title: 'Panorama do mercado em 2024',
    summary: 'O programa Minha Casa, Minha Vida impulsionou o mercado com 380 mil imóveis vendidos. Alta nos preços e aumento no volume financeiro marcam a recuperação e confiança para 2025.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 3,
    title: 'Principais tendências para 2025',
    summary: 'Construções verdes, digitalização com IA, automação de processos e contratos inteligentes como Blockchain marcam o futuro do setor. A tecnologia já é uma necessidade.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 4,
    title: 'Novos modelos de moradia',
    summary: 'Coliving, Cohousing e Corporate Housing ganham força em 2025. Morar de forma flexível e colaborativa se torna tendência, principalmente nos grandes centros urbanos.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 5,
    title: 'O impacto das taxas de juros',
    summary: 'Com a Selic projetada para até 15%, as taxas de financiamento entre 8,80% e 12,49% desafiam o setor. Imóveis de alto padrão e nichos resistentes devem se destacar.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 6,
    title: 'Por que investir em imóveis em 2025',
    summary: 'Segurança, valorização e rentabilidade tornam o imóvel um dos melhores ativos reais em momentos de instabilidade. Ótima opção para investidores conservadores.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 7,
    title: 'Perspectivas futuras para o Brasil',
    summary: 'Cidades como São Paulo, Curitiba e Goiânia lideram oportunidades. Bairros como Morumbi, Saúde e Freguesia do Ó se destacam para quem deseja investir em imóveis verticais.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 8,
    title: 'Políticas públicas e impacto no setor',
    summary: 'Políticas de expansão monetária e controle da inflação impactam diretamente a compra e aluguel de imóveis. Entender esses ciclos é essencial para quem investe.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 9,
    title: 'Comparativo de taxas entre bancos',
    summary: 'Taxas de financiamento em 2025: Caixa: até 9,99% | Banco do Brasil: até 11,33% | Itaú: até 11,88% | Bradesco: até 11,49% | Santander: até 12,49%',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  },
  {
    id: 10,
    title: 'Preparando-se para as tendências',
    summary: 'Com inovação tecnológica e mudanças no comportamento do consumidor, 2025 será marcado por transformação, sustentabilidade e novos modos de viver.',
    date: '14 de março de 2025',
    author: 'Por Tarjab'
  }
]

export default function News() {
  return (
    <>
      <Menu />
      <main className={styles.container}>
        <h1 className={styles.pageTitle}>Novidades do Mercado Imobiliário</h1>
        <div className={styles.newsGrid}>
          {newsData.map((news) => (
            <article key={news.id} className={styles.newsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{news.title}</h2>
              </div>
              <p className={styles.cardSummary}>{news.summary}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardDate}>📅 {news.date}</span>
                <span className={styles.cardAuthor}>✍️ {news.author}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}