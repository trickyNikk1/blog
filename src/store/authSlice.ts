import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import RealworldBlog from '../services/realworld-blog'
import { AuthErrorsType, UserState, UserType } from '../types'

const blogService = new RealworldBlog()

export const updateProfile = createAsyncThunk<
  UserType,
  { username: string; email: string; password: string; image: string; token: string },
  { rejectValue: AxiosError }
>('user/updateProfile', async ({ username, email, password, image, token }, { rejectWithValue }) => {
  const response = await blogService
    .updateProfile(username, email, password, image, token)
    .catch((error: AxiosError) => {
      return rejectWithValue(error.response?.data as AxiosError)
    })
  return response
})

export const registerNewUser = createAsyncThunk<
  UserType,
  { username: string; email: string; password: string },
  { rejectValue: AxiosError }
>('user/registerNewUser', async ({ username, email, password }, { rejectWithValue }) => {
  const response = await blogService.registerNewUser(username, email, password).catch((error: AxiosError) => {
    return rejectWithValue(error.response?.data as AxiosError)
  })
  return response
})

export const login = createAsyncThunk<UserType, { email: string; password: string }, { rejectValue: AxiosError }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await blogService.login(email, password).catch((error: AxiosError) => {
      return rejectWithValue(error.response?.data as AxiosError)
    })
    return response
  }
)

const notAuthUser: UserType = {
  username: null,
  email: null,
  token: null,
  bio: null,
  image: null,
}

const initialState: UserState = {
  loading: 'idle',
  error: null,
  user: notAuthUser,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rebootLoading: (state) => {
      state.error = null
      state.loading = 'idle'
    },
    logout: (state) => {
      state.user = notAuthUser
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.user = notAuthUser
        state.error = action.payload as AuthErrorsType
      })
      .addCase(login.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed'
        state.user = notAuthUser
        state.error = action.payload as AuthErrorsType
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as AuthErrorsType
      })
  },
})

export default authSlice.reducer
export const { logout, rebootLoading } = authSlice.actions