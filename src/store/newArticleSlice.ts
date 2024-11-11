import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import RealworldBlog from '../services/realworld-blog'
import { FieldErrorsType, NewArticleState, NewArticleType, ServerErrorsType } from '../types'

const blogService = new RealworldBlog()

export const createNewArticle = createAsyncThunk<
  NewArticleType,
  { title: string; description: string; body: string; tagList: string[]; token: string },
  { rejectValue: FieldErrorsType }
>('newArticle/createNewArticle', async ({ title, description, body, tagList, token }, { rejectWithValue }) => {
  const response = await blogService
    .createArticle(title, description, body, tagList, token)
    .catch((error: AxiosError<ServerErrorsType>) => {
      if (error.response?.data.errors) return rejectWithValue(error.response?.data.errors)
      return rejectWithValue({ message: 'Unknown error' })
    })
  return response
})
const initialState: NewArticleState = {
  loading: 'idle',
  error: null,
}
export const newArticleSlice = createSlice({
  name: 'newArticle',
  initialState,
  reducers: {
    rebootLoading: (state) => {
      state.loading = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewArticle.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(createNewArticle.fulfilled, (state) => {
      state.loading = 'succeeded'
      state.error = null
    })
    builder.addCase(createNewArticle.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload ?? null
    })
  },
})

export default newArticleSlice.reducer
export const { rebootLoading } = newArticleSlice.actions
