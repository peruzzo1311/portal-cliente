import { ExportaCotacoes } from '@/types/Request'
import { UserProperties } from '@/types/User'
import axios from 'axios'

export async function exportaCotacoes(
  dataInicio: string,
  dataFim: string,
  userProperties: UserProperties
) {
  const body = {
    dataInicio,
    dataFim,
    codEmp: userProperties.codemp,
    codFil: userProperties.codfil,
  }

  const response = await axios.post<ExportaCotacoes>(
    `https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.romaneios&port=RetornaCotacoes&useAlwaysArray=true`,
    body,
    {
      headers: {
        user: 'suporte',
        pass: '@98fm',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
