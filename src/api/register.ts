import { ValidateDocument } from '@/types/Request'
import { RegisterUser } from '@/types/User'
import axios from 'axios'

export async function validateDocument(
  document: string,
  documentType: string,
  email: string
) {
  const data = {
    cgcCpf: document,
    email,
    tipCli: documentType === 'cpf' ? 'F' : 'J',
  }

  const res = await axios.post<ValidateDocument>(
    'https://sistema.kgepel.com.br/API/G5Rest?server=https://sistema.kgepel.com.br&module=sapiens&port=ValidaCNPJ&useAlwaysArray=true&service=com.prisma.portal.faturas',
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

  return res.data
}

export async function createUser(user: RegisterUser) {
  const username = `${user
    .name!.trim()
    .split(' ')[0]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}.${user
    .familyName!.trim()
    .split(' ')[0]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}`

  const data = {
    username: username,
    fullName: `${user.name} ${user.familyName}`,
    email: `${username.toLowerCase()}@kgepel.com.br`,
    password: user.password,
    description: '',
    blocked: false,
    changePassword: false,
    locale: '',
    properties: [
      {
        name: 'codcli',
        value: user.codCli,
      },
    ],
  }

  const res = await axios.post<{ username: string }>(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/createUser',
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return username
}
