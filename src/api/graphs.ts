import { ExportaPagamentos, ExportaPagamentosPeriodo } from '@/types/Request'
import { User } from '@/types/User'
import FormatProperties from '@/utils/format-properties'
import axios from 'axios'

export async function exportaPagamentos6(
  user: User
): Promise<ExportaPagamentos> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=ExportaPagamentos6&useAlwaysArray=true',
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

export async function exportaPagamentosPeriodo(
  user: User
): Promise<ExportaPagamentosPeriodo> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=ExportaPagamentosPeriodo&useAlwaysArray=true',
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
