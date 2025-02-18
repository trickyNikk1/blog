export type LoadingType = 'idle' | 'pending' | 'succeeded' | 'failed'

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
  deleteStatus: LoadingType
  editingStatus: LoadingType
  loading: LoadingType
  error: null | FieldErrorsType
  articleData: ArticleType | null
}
export type ArticlesState = {
  loading: LoadingType
  error: null | FieldErrorsType
  articles: ArticleType[]
  currentPage: number
  articlesCount: number
}
export type NewArticleState = {
  error: null | FieldErrorsType
  loading: LoadingType
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
  image?: string
}
export type ServerErrorsType = {
  errors?: FieldErrorsType
}
export type UserState = {
  loading: LoadingType
  error: FieldErrorsType | null
  user: UserType
}
