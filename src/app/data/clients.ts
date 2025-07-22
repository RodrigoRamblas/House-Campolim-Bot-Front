import { Client } from "@/types/client";

export const clients: Client[] = [
  {
    id: '1',
    name: 'House Campolim',
    description: 'Descreva o imóvel que você procura e nós avisaremos quando encontrá-lo · As melhores ofertas de crédito para você financiar seu imóvel.',
    slug: 'house-campolim',
    logo: '/image/clients/house-campolim.svg'
  },
  {
    id: '2',
    name: 'Imóveis Premium',
    description: 'Apartamentos de alto padrão em Sorocaba',
    slug: 'imoveis-premium',
    logo: '/image/clients/growthrats.svg'
  },
  {
    id: '3',
    name: 'Vila Verde',
    description: 'Condomínios sustentáveis e casas ecológicas',
    slug: 'vila-verde',
    logo: '/image/clients/house-green.svg'
  }
]