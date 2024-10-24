import { AxiosError } from 'axios'

export type ArticleType = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[] | null
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export type ArticleState = {
  deleteStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
  editingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | ServerErrorsType
  articleData: ArticleType | null
}
export type ArticlesState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | AxiosError
  articles: ArticleType[]
  currentPage: number
  articlesCount: number
}
export type NewArticleState = {
  error: null | ServerErrorsType
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}
export type NewArticleType = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type GetArticlesDataResponse = {
  articles: ArticleType[]
  articlesCount: number
}

export type UserType = {
  email: string | null
  username: string | null
  bio: string | null
  image: string | null
  token: string | null
}

export type FieldErrorsType = {
  email?: string
  password?: string
  username?: string
  message?: string
  error?: { status: number }
  'email or password'?: string
  image: string
}
export type AuthErrorsType = {
  errors?: FieldErrorsType
}
export type ServerErrorsType = {
  message?: string
  code?: string
  errors?: { [key: string]: string }
}
export type UserState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | AuthErrorsType
  user: UserType
}
