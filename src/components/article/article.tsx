import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { Popconfirm, PopconfirmProps, Button } from 'antd'

import { ReactComponent as Heart } from '../svgs/heart.svg'
import { ReactComponent as HeartFilled } from '../svgs/heart_filled.svg'
import type { ArticleType } from '../../types'
import { useAppDispatch, useAuth } from '../../hooks'
import { deleteArticle, favoriteArticle, unfavoriteArticle } from '../../store/articleSlice'

import styles from './article.module.scss'

type ArticleProps = {
  articleData: ArticleType | null
  isArticlePage?: boolean
  isLogged?: boolean
}
export default function Article({ articleData: data, isArticlePage = false }: ArticleProps) {
  const { isAuth, username: currentUsername, token } = useAuth()
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
  const dispatch = useAppDispatch()
  const { username, image } = author
  const tagsElements =
    tags &&
    tags.map((tag, index) => (
      <span key={tag + index} className={styles.tag}>
        {tag}
      </span>
    ))

  const heartIcon = favorited ? <HeartFilled className={styles.icon} /> : <Heart className={styles.icon} />
  const formatedDate = createdAt
    ? format(new Date(createdAt), 'MMMM dd, yyyy')
    : format(new Date(updatedAt), 'MMMM dd, yyyy')

  const bodyElement = isArticlePage ? <Markdown className={styles.body}>{body}</Markdown> : null

  const confirm: PopconfirmProps['onConfirm'] = () => {
    if (token) {
      dispatch(deleteArticle({ slug, token }))
    }
  }

  const clickHeartHandler = () => {
    if (token && !favorited) {
      dispatch(favoriteArticle({ slug, token }))
    }
    if (token && favorited) {
      dispatch(unfavoriteArticle({ slug, token }))
    }
  }

  const cancel: PopconfirmProps['onCancel'] = () => {}
  const isAuthor = currentUsername === username
  const isEditable = isAuthor && isArticlePage
  const buttons = isEditable ? (
    <div className={styles.buttons}>
      <Popconfirm
        title={null}
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        placement="right"
      >
        <Button className={styles.button_delete} danger>
          Delete
        </Button>
      </Popconfirm>
      <Link className={styles.link + ' ' + styles.button_edit} to={`/articles/${slug}/edit`}>
        Edit
      </Link>
    </div>
  ) : null
  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link className={styles.link} to={`/articles/${slug}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          <div className={styles.heart}>
            <button disabled={!isAuth} onClick={clickHeartHandler} className={styles.button_heart} type="button">
              {heartIcon}
            </button>
            <div className={styles.counter}>{favoritesCount}</div>
          </div>
        </div>
        <div className={styles.tags}>{tagsElements}</div>
        <p className={styles.description}>{description}</p>
        {bodyElement}
      </div>
      <div className={styles.article_inner}>
        <div className={styles.info}>
          <div className={styles.info_text}>
            <span className={styles.author}>{username}</span>
            <span className={styles.date}>{formatedDate}</span>
          </div>
          <div className={styles['avatar-wrapper']}>
            <img className={styles.avatar} src={image} alt={username} />
          </div>
        </div>
        {buttons}
      </div>
    </article>
  )
}
