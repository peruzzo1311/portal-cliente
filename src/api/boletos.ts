import {
  BaixarTitulo,
  ExportaTitulos,
} from '@/types/Request'
import Titulo from '@/types/Titulo'
import { User } from '@/types/User'
import axios from 'axios'
import FormatProperties from 'utils/format-properties'

export async function exportaTitulos(
  user: User
): Promise<ExportaTitulos> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&port=ExportaTitulos&useAlwaysArray=true&service=com.prisma.portal.faturas',
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

export async function baixarTitulo(
  user: User,
  titulo: Titulo
): Promise<BaixarTitulo> {
  const data = JSON.stringify({
    codEmp: titulo.codEmp,
    codFil: titulo.codFil,
    codTpt: titulo.codTpt,
    numTit: titulo.numTit,
  })

  const response = await axios.post(
    'https://demonstra.prismainformatica.com.br:8188/SXI/G5Rest?server=https://demonstra.prismainformatica.com.br:8188&module=sapiens&service=com.prisma.portal.faturas&port=BaixarBoleto&useAlwaysArray=true',
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
