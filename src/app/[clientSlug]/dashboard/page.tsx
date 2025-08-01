'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import HomeScreen from '@/components/HomeScreen'
import { clients } from '../../data/clients'

export default function DashboardPage() {
  const { clientSlug } = useParams()
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push(`/${clientSlug}`)
    }
  }, [clientSlug, router])
  
  const client = clients.find(c => c.slug === clientSlug)
  
  if (!client) {
    return null
  }
  
  return <HomeScreen client={client} />
}