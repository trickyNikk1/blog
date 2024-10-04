import axios from 'axios'

import { ArticleType } from '../types'

export default class RealworldBlog {
  _baseUrl = 'https://blog.kata.academy/api/'
  async getArticlesData(page = 1) {
    try {
      const endpoint = 'articles'
      const response = await axios.get(this._baseUrl + endpoint, {
        params: {
          limit: 5,
          offset: (page - 1) * 5,
        },
      })
      return response
    } catch (error) {
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.errors.message)
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  async getArticleData(slug: string) {
    try {
      const endpoint = `articles/${slug}`
      const response = await axios.get<{ article: ArticleType }>(this._baseUrl + endpoint)
      return response.data.article
    } catch (error) {
      console.log(error)
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.errors.message)
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
