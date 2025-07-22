'use client'

import Menu from '@/components/menu/page'
import styles from './About.module.scss'

export default function About() {
  return (
    <>
      <Menu />
      <main className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.aboutCard}>
            <h1 className={styles.title}>Sobre a Growthrats</h1>
            
            <div className={styles.intro}>
              <p>
                Na <strong>Growthrats</strong>, somos apaixonados por crescimento. Somos uma empresa especializada em marketing digital voltada para o setor imobiliário, com foco em estratégias que geram resultados reais para nossos clientes.
              </p>
              <p>
                Nosso principal objetivo é <strong>aumentar a visibilidade online de imobiliárias</strong>, corretores e construtoras, por meio de ações personalizadas de SEO (otimização para mecanismos de busca), gestão estratégica de redes sociais como o Instagram e captação de novos clientes e leads qualificados.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>O que fazemos:</h2>
              <div className={styles.services}>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>🔍</div>
                  <h3>Melhoria de SEO</h3>
                  <p>Otimizamos o seu site para que ele seja encontrado facilmente no Google, atraindo visitantes certos no momento certo.</p>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>📱</div>
                  <h3>Gestão de Instagram Imobiliário</h3>
                  <p>Criamos e planejamos conteúdos que fortalecem sua marca, geram engajamento e despertam o interesse de compradores em potencial.</p>
                </div>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>🎯</div>
                  <h3>Captação Inteligente de Leads</h3>
                  <p>Utilizamos ferramentas e estratégias eficazes para atrair e nutrir leads realmente interessados nos seus imóveis.</p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Nosso diferencial:</h2>
              <ul className={styles.differentials}>
                <li>Atendimento personalizado e focado no seu nicho</li>
                <li>Equipe experiente em marketing para o mercado imobiliário</li>
                <li>Soluções que combinam tecnologia, criatividade e dados</li>
              </ul>
            </div>

            <div className={styles.cta}>
              <p>Se você quer <strong>vender mais, atrair mais clientes e se destacar no mercado imobiliário</strong>, fale com a Growthrats. Vamos crescer juntos!</p>
              <button className={styles.ctaButton}>Entre em Contato</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}