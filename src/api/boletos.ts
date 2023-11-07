import { BaixarTitulo, ExportaTitulos } from '@/types/Request'
import Titulo from '@/types/Titulo'
import { User } from '@/types/User'
import FormatProperties from '@/utils/format-properties'
import axios from 'axios'

export async function exportaTitulos(user: User): Promise<ExportaTitulos> {
  const data = FormatProperties(user.properties)

  const response = await axios.post(
    'https://sistema.kgepel.com.br/API/G5Rest?server=https://sistema.kgepel.com.br&module=sapiens&port=ExportaTitulos&useAlwaysArray=true&service=com.prisma.portal.faturas',
    data,
    {
      headers: {
        user: 'joao.dayko',
        pass: '102030',
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
    'https://sistema.kgepel.com.br/API/G5Rest?server=https://sistema.kgepel.com.br&module=sapiens&service=com.prisma.portal.faturas&port=BaixarBoleto&useAlwaysArray=true',
    data,
    {
      headers: {
        user: 'joao.dayko',
        pass: '102030',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
