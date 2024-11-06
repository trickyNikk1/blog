import React, { useEffect } from 'react'
import { Form, Spin, Alert } from 'antd'
import type { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@hooks/index'
import { createNewArticle, rebootLoading } from '@store/newArticleSlice'
import { ArticleForm } from '@components/article-form'

import styles from './new-article-page.module.scss'

type FieldType = {
  title?: string
  description?: string
  body?: string
  tagList?: { tag: string }[]
}
export const NewArticlePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<FieldType>()
  const { loading, error } = useAppSelector((state) => state.newArticle)
  const { user } = useAppSelector((state) => state.auth)
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { title, description, body, tagList } = values
    if (title && description && body) {
      const newArticleData = {
        title,
        description,
        body,
        tagList: tagList ? tagList.map((tag) => tag.tag) : [],
        token: user.token || '',
      }
      dispatch(createNewArticle(newArticleData))
    }
  }
  useEffect(() => {
    if (loading === 'succeeded') {
      navigate('/')
      dispatch(rebootLoading())
    }
  }, [loading, navigate])

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const spinner = loading === 'pending' ? <Spin className={styles.spinner} fullscreen={true} /> : null
  const alert = error?.message ? (
    <Alert className={styles.alert} message="Error" description={error.message} type="error" showIcon closable />
  ) : null
  return (
    <div className={styles.wrapper}>
      {spinner}
      {alert}
      <div className={styles.container}>
        <h1 className={styles.title}>Create new article</h1>
        <ArticleForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </div>
    </div>
  )
}
