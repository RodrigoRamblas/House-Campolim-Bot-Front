'use client'

import Menu from '@/components/menu/page'
import styles from './AIAgents.module.scss'

const benefits = [
  {
    id: 1,
    icon: '🔍',
    title: 'Validação do site',
    description: 'O robô analisa páginas do seu site e identifica problemas técnicos, lentidão, erros de layout e pontos que prejudicam seu ranqueamento no Google.'
  },
  {
    id: 2,
    icon: '📢',
    title: 'Ajuste automático de anúncios',
    description: 'Otimiza os anúncios de imóveis, corrigindo títulos, descrições e categorização para atrair mais cliques e leads qualificados.'
  },
  {
    id: 3,
    icon: '✍️',
    title: 'Melhoria de textos para SEO',
    description: 'Reescreve os textos dos seus imóveis e páginas para se destacarem nos buscadores, aumentando o tráfego orgânico.'
  },
  {
    id: 4,
    icon: '🖼️',
    title: 'Otimização de imagens',
    description: 'Comprime imagens pesadas, sugere melhorias visuais e ajuda a carregar mais rápido, sem perder a qualidade.'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Relatórios automáticos',
    description: 'Gera relatórios com sugestões práticas e indicadores de desempenho para facilitar a tomada de decisão.'
  }
]

export default function AIAgents() {
  return (
    <>
      <Menu />
      <main className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Robô de IA da Growthrats</h1>
          <p className={styles.subtitle}>Inteligência Artificial a favor do seu crescimento imobiliário</p>
        </section>

        <section className={styles.description}>
          <div className={styles.descriptionContent}>
            <p>
              Na Growthrats, unimos inteligência artificial e marketing imobiliário para oferecer um robô inteligente que analisa, corrige e melhora automaticamente a performance digital dos nossos clientes.
            </p>
            <p>
              Nosso <strong>Agente de IA</strong> realiza auditorias no seu site e nas redes sociais para otimizar todos os elementos que impactam suas vendas, visibilidade e captação de leads.
            </p>
          </div>
        </section>

        <section className={styles.benefits}>
          <h2 className={styles.benefitsTitle}>Principais Benefícios</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Pronto para revolucionar seu marketing imobiliário?</h2>
          <p>Deixe nosso Robô de IA trabalhar para você e veja seus resultados crescerem</p>
          <button className={styles.ctaButton}>Começar Agora</button>
        </section>
      </main>
    </>
  )
}