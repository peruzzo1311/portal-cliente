import { userSlice } from '@/store/user/slice'
import { configureStore } from '@reduxjs/toolkit'
import { userPropertiesSlice } from './user-properties/slice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userProperties: userPropertiesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
