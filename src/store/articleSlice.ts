import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import RealworldBlog from '../services/realworld-blog'
import { ArticleType, ArticleState, ServerErrorsType } from '../types'

const blogService = new RealworldBlog()

export const getArticleData = createAsyncThunk<ArticleType, string, { rejectValue: ServerErrorsType }>(
  'article/getArticleData',
  async (slug, { rejectWithValue }) => {
    const response = await blogService.getArticleData(slug).catch((error: AxiosError) => {
      return rejectWithValue(error.response?.data as ServerErrorsType)
    })
    return response
  }
)

export const updateArticle = createAsyncThunk<
  ArticleType,
  { slug: string; title: string; description: string; body: string; tagList: string[]; token: string },
  { rejectValue: ServerErrorsType }
>('article/updateArticle', async ({ slug, title, description, body, tagList, token }, { rejectWithValue }) => {
  const response = await blogService
    .updateArticle(slug, title, description, body, tagList, token)
    .catch((error: AxiosError) => {
      return rejectWithValue(error.response?.data as ServerErrorsType)
    })
  return response
})

export const deleteArticle = createAsyncThunk<void, { slug: string; token: string }, { rejectValue: ServerErrorsType }>(
  'article/deleteArticle',
  async ({ slug, token }, { rejectWithValue }) => {
    await blogService.deleteArticle(slug, token).catch((error: AxiosError) => {
      return rejectWithValue(error.response?.data as ServerErrorsType)
    })
  }
)

const initialState: ArticleState = {
  deleteStatus: 'idle',
  editingStatus: 'idle',
  loading: 'idle',
  error: null,
  articleData: null,
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    reset(state) {
      state.deleteStatus = 'idle'
      state.editingStatus = 'idle'
      state.loading = 'idle'
      state.error = null
      state.articleData = null
    },
    rebootLoading(state) {
      state.loading = 'idle'
      state.error = null
    },
  },
  extraReducers(builder) {
    builder.addCase(getArticleData.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getArticleData.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.articleData = action.payload
    })
    builder.addCase(getArticleData.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as ServerErrorsType
    })

    builder.addCase(updateArticle.pending, (state) => {
      state.loading = 'pending'
      state.editingStatus = 'pending'
    })
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.editingStatus = 'succeeded'
      state.articleData = action.payload
    })
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.loading = 'failed'
      state.editingStatus = 'failed'
      state.error = action.payload as ServerErrorsType
    })

    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = 'pending'
      state.deleteStatus = 'pending'
    })
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.loading = 'succeeded'
      state.deleteStatus = 'succeeded'
      state.articleData = null
    })
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = 'failed'
      state.deleteStatus = 'failed'
      state.error = action.payload?.errors as ServerErrorsType
    })
  },
})

export default articleSlice.reducer
export const { reset, rebootLoading } = articleSlice.actions
