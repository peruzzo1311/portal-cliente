import { User } from '@/types/User'
import axios from 'axios'

interface getTokenParams {
  username: string
  password: string
}

interface getUserParams {
  username: string
  token: string
}

export async function login({ username, password }: getTokenParams) {
  const token = await getToken({ username, password })

  const user = await getUser({ username, token })

  return { user, token }
}

export async function getToken({ username, password }: getTokenParams) {
  const data = {
    username: `${username.trim()}@prisma-demo.com.br.seniorx`,
    password,
  }
  const res = await axios.post(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const token: string = JSON.parse(res.data.jsonToken).access_token

  return token
}

export async function getUser({
  username,
  token,
}: getUserParams): Promise<User> {
  const res = await axios.post(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser',
    {
      username,
      includePhoto: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
  )

  return res.data
}
