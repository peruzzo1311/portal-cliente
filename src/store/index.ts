import { userSlice } from '@/store/user/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
