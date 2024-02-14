import { UserProperties } from '@/types/User'
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '..'

const initialState = {
  codemp: '',
  codfil: '',
  codcli: '',
  codfor: '',
} as UserProperties

export const userPropertiesSlice = createSlice({
  name: 'userProperties',
  initialState,
  reducers: {
    setProperties: (
      state,
      action: PayloadAction<UserProperties>
    ) => {
      state.codcli = action.payload.codcli
      state.codemp = action.payload.codemp
      state.codfil = action.payload.codfil
      state.codfor = action.payload.codfor
    },
  },
})

export const { setProperties } = userPropertiesSlice.actions

export const selectUserProperties = (state: RootState) =>
  state

export default userPropertiesSlice.reducer
