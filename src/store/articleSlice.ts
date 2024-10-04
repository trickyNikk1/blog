import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import RealworldBlog from '../services/realworld-blog'
import { ArticleType, ArticleState } from '../types'

const blogService = new RealworldBlog()

export const getArticleData = createAsyncThunk<ArticleType, string>('article/getArticleData', async (slug) => {
  const response = await blogService.getArticleData(slug)
  if (!response) {
    throw new Error('Article not found')
  }
  return response
})
const initialState: ArticleState = {
  loading: 'idle',
  error: null,
  articleData: null,
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
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
      state.error = action.error.message ? action.error.message : 'unknown error'
    })
  },
})

export default articleSlice.reducer
