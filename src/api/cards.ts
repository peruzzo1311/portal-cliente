import {
  FaturaMesAnterior,
  FaturaMesAtual,
} from '@/types/Request'
import { User } from '@/types/User'
import axios from 'axios'
import FormatProperties from 'utils/format-properties'

export async function ExportaFaturaMesAtual(
  user: User
): Promise<FaturaMesAtual> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=ExportaFaturasMesAtual&useAlwaysArray=true',
    data,
    {
      headers: {
        user: 'suporte',
        pass: '@98fm',
        EncryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}

export async function ExportaFaturaMesAnterior(
  user: User
): Promise<FaturaMesAnterior> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=ExportaFaturasMesAnterior&useAlwaysArray=true',
    data,
    {
      headers: {
        user: 'suporte',
        pass: '@98fm',
        EncryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
