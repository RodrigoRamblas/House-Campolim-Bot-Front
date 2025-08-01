'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useRef } from 'react'
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
    router.push(`/${clientSlug}`)
  }
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    // Validate file type
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if (!validTypes.includes(file.type)) {
      setUploadError('Por favor, selecione um arquivo Excel (.xls ou .xlsx)')
      return
    }
    
    setUploading(true)
    setUploadError('')
    setUploadSuccess(false)
    
    const formData = new FormData()
    formData.append('file', file)
    
    const token = localStorage.getItem('token')
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT || process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/automation/process-excel`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Erro ao processar arquivo')
      }
      
      setUploadSuccess(true)
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Erro ao fazer upload do arquivo')
    } finally {
      setUploading(false)
    }
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
              <span className={styles.icon}>💬</span>
            </div>
            <h3>Chat</h3>
            <p>Inicie uma conversa com nosso assistente</p>
            <button className={styles.optionButton}>
              Abrir Chat
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📊</span>
            </div>
            <h3>Relatórios</h3>
            <p>Visualize relatórios e análises</p>
            <button className={styles.optionButton}>
              Ver Relatórios
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>⚙️</span>
            </div>
            <h3>Configurações</h3>
            <p>Gerencie suas preferências</p>
            <button className={styles.optionButton}>
              Configurar
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📁</span>
            </div>
            <h3>Documentos</h3>
            <p>Acesse documentos importantes</p>
            <button className={styles.optionButton}>
              Ver Documentos
            </button>
          </div>
          
          <div className={styles.optionCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📤</span>
            </div>
            <h3>Upload de Planilha</h3>
            <p>Faça upload de arquivo Excel para processamento</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
              className={styles.fileInput}
              id="excel-upload"
            />
            
            <label htmlFor="excel-upload" className={styles.uploadButton}>
              {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
            </label>
            
            {uploadError && (
              <div className={styles.uploadError}>
                {uploadError}
              </div>
            )}
            
            {uploadSuccess && (
              <div className={styles.uploadSuccess}>
                Arquivo processado com sucesso!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}