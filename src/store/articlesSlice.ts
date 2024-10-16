import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import RealworldBlog from '../services/realworld-blog'
import { ArticlesState, GetArticlesDataResponse } from '../types'

const blogService = new RealworldBlog()

export const getArticlesData = createAsyncThunk<GetArticlesDataResponse, number | undefined>(
  'blog/getArticlesData',
  async (page) => {
    const response = await blogService.getArticlesData(page)
    return response?.data
  }
)
const initialState: ArticlesState = {
  loading: 'idle',
  error: null,
  articles: [],
  currentPage: 1,
  articlesCount: 0,
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getArticlesData.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getArticlesData.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    })
    builder.addCase(getArticlesData.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error as AxiosError
    })
  },
})

export default articlesSlice.reducer
