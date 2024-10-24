import axios, { AxiosError } from 'axios'

import { ArticleType, UserType } from '../types'

export default class RealworldBlog {
  _baseUrl = 'https://blog-platform.kata.academy/api/'
  async getArticlesData(page = 1) {
    const endpoint = 'articles'
    const response = await axios
      .get(this._baseUrl + endpoint, {
        params: {
          limit: 5,
          offset: (page - 1) * 5,
        },
      })
      .catch((error: AxiosError) => {
        console.error(error)
        throw error
      })
    return response
  }
  async getArticleData(slug: string) {
    const endpoint = `articles/${slug}`
    const response = await axios.get<{ article: ArticleType }>(this._baseUrl + endpoint).catch((error: AxiosError) => {
      throw error
    })
    return response.data.article
  }
  async registerNewUser(username: string, email: string, password: string) {
    const endpoint = 'users'
    const response = await axios.post(this._baseUrl + endpoint, {
      user: {
        username,
        email,
        password,
      },
    })
    return response.data.user as UserType
  }
  async login(email: string, password: string) {
    const endpoint = 'users/login'
    const response = await axios.post(this._baseUrl + endpoint, {
      user: {
        email,
        password,
      },
    })
    return response.data.user as UserType
  }

  async updateProfile(username: string, email: string, password: string, image: string, token: string) {
    const endpoint = 'user'
    const response = await axios.put(
      this._baseUrl + endpoint,
      {
        user: {
          username,
          email,
          password,
          image,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data.user as UserType
  }
  async createArticle(title: string, description: string, body: string, tagList: string[] | null, token: string) {
    const endpoint = 'articles'
    const response = await axios.post(
      this._baseUrl + endpoint,
      {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data.article
  }

  async updateArticle(
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[] | null,
    token: string
  ) {
    const endpoint = `articles/${slug}`
    const response = await axios.put(
      this._baseUrl + endpoint,
      {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data.article
  }

  async deleteArticle(slug: string, token: string) {
    const endpoint = `articles/${slug}`
    const response = await axios.delete(this._baseUrl + endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response
  }
}
