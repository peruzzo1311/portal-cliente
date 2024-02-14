import { ExportaRomaneios } from '@/types/Request'
import { User } from '@/types/User'
import axios from 'axios'
import FormatProperties from 'utils/format-properties'

export async function GetRomaneios(user: User) {
  const userProperties = FormatProperties(user.properties)

  const data = {
    codEmp: '5',
    codFil: '1',
    codFor: userProperties.codCli,
  }

  const response = await axios.post<ExportaRomaneios>(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.romaneios&port=RetornaRomaneios&UseAlwaysArrray=true',
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
