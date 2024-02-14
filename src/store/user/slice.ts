import { User } from '@/types/User'
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '..'

const userInitialState = {
  admin: false,
  allowedToChangePassword: false,
  authenticationType: '',
  blocked: false,
  changePassword: false,
  email: '',
  fullName: '',
  id: '',
  photo: '',
  photoUrl: '',
  photoUrlExpirationDate: '',
  properties: [],
  tenantDomain: '',
  tenantLocale: '',
  username: '',
  _discriminator: '',
  keepLogin: false,
  token: '',
} as User

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.allowedToChangePassword =
        action.payload.allowedToChangePassword
      state.authenticationType =
        action.payload.authenticationType
      state.blocked = action.payload.blocked
      state.changePassword = action.payload.changePassword
      state.email = action.payload.email
      state.fullName = action.payload.fullName
      state.id = action.payload.id
      state.photo = action.payload.photo
      state.photoUrl = action.payload.photoUrl
      state.photoUrlExpirationDate =
        action.payload.photoUrlExpirationDate
      state.properties = action.payload.properties
      state.tenantDomain = action.payload.tenantDomain
      state.tenantLocale = action.payload.tenantLocale
      state.username = action.payload.username
      state._discriminator = action.payload._discriminator
      state.keepLogin = action.payload.keepLogin
      state.token = action.payload.token
    },
    changePhotoUrl: (
      state,
      action: PayloadAction<string>
    ) => {
      state.photoUrl = action.payload
    },
    clearUser: state => {
      state = userInitialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
