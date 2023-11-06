import { ExportaPagamentos, ExportaPagamentosPeriodo } from '@/types/Request'
import { User } from '@/types/User'
import FormatProperties from '@/utils/formatProperties'
import axios from 'axios'

export async function exportaPagamentos6(
  user: User
): Promise<ExportaPagamentos> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://sistema.kgepel.com.br/API/G5Rest?server=https://sistema.kgepel.com.br&module=sapiens&service=com.prisma.portal.faturas&port=ExportaPagamentos6&useAlwaysArray=true',
    data,
    {
      headers: {
        user: 'joao.dayko',
        pass: '102030',
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
    'https://sistema.kgepel.com.br/API/G5Rest?server=https://sistema.kgepel.com.br&module=sapiens&service=com.prisma.portal.faturas&port=ExportaPagamentosPeriodo&useAlwaysArray=true',
    data,
    {
      headers: {
        user: 'joao.dayko',
        pass: '102030',
        EncryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
