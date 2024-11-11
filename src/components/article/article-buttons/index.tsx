import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Popconfirm, PopconfirmProps } from 'antd'

import { useAppDispatch } from '@hooks/index'
import { deleteArticle } from '@store/articleSlice'

import styles from './article-buttons.module.scss'

type ArticleButtonsProps = {
  slug: string
  token: string | null
}
export const ArticleButtons: FC<ArticleButtonsProps> = ({ slug, token }) => {
  const dispatch = useAppDispatch()

  const cancel: PopconfirmProps['onCancel'] = () => {}

  const confirm: PopconfirmProps['onConfirm'] = () => {
    if (token) {
      dispatch(deleteArticle({ slug, token }))
    }
  }
  return (
    <div className={styles.container}>
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
  )
}
