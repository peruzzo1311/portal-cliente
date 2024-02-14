export interface User {
  admin: boolean
  allowedToChangePassword: boolean
  authenticationType: string
  blocked: boolean
  changePassword: boolean
  email: string
  fullName: string
  id: string
  photo: string
  photoUrl: string
  photoUrlExpirationDate: string
  properties: Properties[]
  tenantDomain: string
  tenantLocale: string
  username: string
  _discriminator: string
  keepLogin?: boolean
  token?: string
  password?: string
}

export interface Properties {
  name: string
  value: string
}

export interface RegisterUser {
  name: string | null | undefined
  familyName: string | null | undefined
  email: string
  password: string | null | undefined
  codCli: number
  token: string
}

export interface UserProperties {
  codcli?: string
  codemp?: string
  codfil?: string
  codfor?: string
}
