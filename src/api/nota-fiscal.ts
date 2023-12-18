import { BaixarNota, ExportaNotas } from '@/types/Request'
import { User } from '@/types/User'
import NotaFiscal from '@/types/nota-fiscal'
import FormatProperties from '@/utils/format-properties'
import axios from 'axios'

export async function exportaNotas(user: User): Promise<ExportaNotas> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=ExportaNotas&useAlwaysArray=true',
    data,
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

export async function baixarNota(
  user: User,
  nota: NotaFiscal
): Promise<BaixarNota> {
  const data = JSON.stringify({
    codEmp: nota.codEmp,
    codFil: nota.codFil,
    codSnf: nota.codSnf,
    numNfv: nota.numNfv,
  })

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=BaixarDanfe&useAlwaysArray=true',
    data,
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
