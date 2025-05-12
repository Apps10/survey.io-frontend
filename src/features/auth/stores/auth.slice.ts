import type { IAuthUser } from "../interfaces/user.interface";
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  authUser: IAuthUser | null,
  token: string | null
}

const initialState: AuthState = {
  authUser: null,
  token: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload
    },
    logout(state) {
      state.authUser = null
    }
  }
})

export const { setAuthUser, logout } = authSlice.actions
export default authSlice.reducer