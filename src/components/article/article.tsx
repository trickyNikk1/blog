import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import { ReactComponent as Heart } from '../svgs/heart.svg'
import { ReactComponent as HeartFilled } from '../svgs/heart_filled.svg'
import type { ArticleType } from '../../types'

import styles from './article.module.scss'

type ArticleProps = {
  articleData: ArticleType | null
  isArticlePage?: boolean
  isLogged?: boolean
}
export default function Article({ articleData: data, isArticlePage = false, isLogged = false }: ArticleProps) {
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
  const tagsElements =
    tags &&
    tags.map((tag) => (
      <span key={tag} className={styles.tag}>
        {tag}
      </span>
    ))

  const heartIcon = favorited ? <HeartFilled className={styles.icon} /> : <Heart className={styles.icon} />
  const formatedDate = createdAt
    ? format(new Date(createdAt), 'MMMM dd, yyyy')
    : format(new Date(updatedAt), 'MMMM dd, yyyy')

  const bodyElement = isArticlePage ? <Markdown className={styles.body}>{body}</Markdown> : null
  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link className={styles.link} to={`/articles/${slug}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          <div className={styles.heart}>
            <button disabled={!isLogged} className={styles.button_heart} type="button">
              {heartIcon}
            </button>
            <div className={styles.counter}>{favoritesCount}</div>
          </div>
        </div>
        <div className={styles.tags}>{tagsElements}</div>
        <p className={styles.description}>{description}</p>
        {bodyElement}
      </div>
      <a className={styles.link + ' ' + styles.info} href="/">
        <div className={styles.info_text}>
          <span className={styles.author}>{username}</span>
          <span className={styles.date}>{formatedDate}</span>
        </div>
        <div className={styles['avatar-wrapper']}>
          <img className={styles.avatar} src={image} alt={username} />
        </div>
      </a>
    </article>
  )
}
