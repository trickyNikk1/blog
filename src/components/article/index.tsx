import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import type { ArticleType } from '@my-types/index'
import { useAppDispatch, useAuth } from '@hooks/index'
import { favoriteArticle, unfavoriteArticle } from '@store/articleSlice'
import { Heart } from '@components/article/heart'

import styles from './article.module.scss'
import { ArticleButtons } from './article-buttons'
import { formatedDate } from './article.helpers'

type ArticleProps = {
  articleData: ArticleType | null
  isArticlePage?: boolean
  isLogged?: boolean
}
export const Article: FC<ArticleProps> = ({ articleData: data, isArticlePage = false }) => {
  if (!data) return null

  const {
    title,
    description,
    tagList: tags,
    body,
    author,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    slug,
  } = data
  const { username, image } = author

  const { isAuth, username: currentUsername, token } = useAuth()

  const dispatch = useAppDispatch()

  const tagsElements =
    tags &&
    tags.map((tag, index) => (
      <span key={tag + index} className={styles.tag}>
        {tag}
      </span>
    ))

  const clickHeartHandler = () => {
    if (token && !favorited) {
      dispatch(favoriteArticle({ slug, token }))
    }
    if (token && favorited) {
      dispatch(unfavoriteArticle({ slug, token }))
    }
  }

  const isEditable = currentUsername === username && isArticlePage

  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link className={styles.link} to={`/articles/${slug}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          <Heart favorited={favorited} counter={favoritesCount} isAuth={isAuth} clickHeartHandler={clickHeartHandler} />
        </div>
        <div className={styles.tags}>{tagsElements}</div>
        <p className={styles.description}>{description}</p>
        {isArticlePage ? <Markdown className={styles.body}>{body}</Markdown> : null}
      </div>
      <div className={styles.article_inner}>
        <div className={styles.info}>
          <div className={styles.info_text}>
            <span className={styles.author}>{username}</span>
            <span className={styles.date}>{formatedDate(createdAt, updatedAt)}</span>
          </div>
          <div className={styles['avatar-wrapper']}>
            <img className={styles.avatar} src={image} alt={username} />
          </div>
        </div>
        {isEditable ? <ArticleButtons slug={slug} token={token} /> : null}
      </div>
    </article>
  )
}
