import { configureStore } from '@reduxjs/toolkit'

import { default as articlesSliceReducer } from './articlesSlice'
import { default as articleSliceReducer } from './articleSlice'

const store = configureStore({
  reducer: {
    ArticlesSlice: articlesSliceReducer,
    ArticleSlice: articleSliceReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
