import ExportaContratos from '@/types/Request'
import axios from 'axios'

export async function exportaContratos(codFor: string) {
  const body = {
    codFor,
  }

  const response = await axios.post<ExportaContratos>(
    `https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.romaneios&port=RetornaContratos&useAlwaysArray=true`,
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
