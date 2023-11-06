import { User } from '@/types/User'
import axios from 'axios'

export async function changeAvatar(user: User, image: string) {
  const data = {
    blocked: false,
    changePassword: false,
    email: user.email,
    fullName: user.fullName,
    locale: null,
    photo: image,
    username: user.username,
  }

  const response = await axios.post(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/actions/updateUser',
    data,
    {
      headers: {
        Authorization: `bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}

export async function getUserPhoto(username: string, token: string) {
  const response = await axios.post(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUserPhoto',

    {
      username: username,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
