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
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | string
  articleData: ArticleType | null
}
export type ArticlesState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | string
  articles: ArticleType[]
  currentPage: number
  articlesCount: number
}

export type GetArticlesDataResponse = {
  articles: ArticleType[]
  articlesCount: number
}
