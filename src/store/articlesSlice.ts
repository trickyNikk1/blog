import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import RealworldBlog from '@services/realworld-blog'
import { ArticlesState, ArticleType, FieldErrorsType, GetArticlesDataResponse, ServerErrorsType } from '@my-types/index'

const blogService = new RealworldBlog()

export const getArticlesData = createAsyncThunk<
  GetArticlesDataResponse,
  { page: number; token: string | null },
  { rejectValue: FieldErrorsType }
>('blog/getArticlesData', async ({ page, token }, { rejectWithValue }) => {
  const response = await blogService.getArticlesData(page, token).catch((error: AxiosError<ServerErrorsType>) => {
    if (error.response?.data.errors) return rejectWithValue(error.response?.data.errors)
    return rejectWithValue({ message: 'Unknown error' })
  })
  return response
})

export const favoriteArticle = createAsyncThunk<
  ArticleType,
  { slug: string; token: string },
  { rejectValue: FieldErrorsType }
>('article/favoriteArticle', async ({ slug, token }, { rejectWithValue }) => {
  const response = await blogService.favoriteArticle(slug, token).catch((error: AxiosError<ServerErrorsType>) => {
    if (error.response?.data.errors) return rejectWithValue(error.response?.data.errors)
    return rejectWithValue({ message: 'Unknown error' })
  })
  return response
})

export const unfavoriteArticle = createAsyncThunk<
  ArticleType,
  { slug: string; token: string },
  { rejectValue: FieldErrorsType }
>('article/unfavoriteArticle', async ({ slug, token }, { rejectWithValue }) => {
  const response = await blogService.unfavoriteArticle(slug, token).catch((error: AxiosError<ServerErrorsType>) => {
    if (error.response?.data.errors) return rejectWithValue(error.response?.data.errors)
    return rejectWithValue({ message: 'Unknown error' })
  })
  return response
})

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
      state.error = action.error
    })
    builder.addCase(favoriteArticle.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(favoriteArticle.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          return action.payload
        }
        return article
      })
    })
    builder.addCase(favoriteArticle.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload ?? null
    })
    builder.addCase(unfavoriteArticle.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(unfavoriteArticle.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          return action.payload
        }
        return article
      })
    })
    builder.addCase(unfavoriteArticle.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload ?? null
    })
  },
})

export default articlesSlice.reducer
