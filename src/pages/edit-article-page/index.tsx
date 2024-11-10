import React, { useEffect } from 'react'
import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom'
import { Form, FormProps } from 'antd'

import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { getArticleData, updateArticle } from '@store/articleSlice'
import { ArticleForm } from '@components/article-form'
import { SetContent } from '@hoc/set-content'

import styles from './edit-article-page.module.scss'

type FieldType = {
  title?: string
  description?: string
  body?: string
  tagList?: { tag: string }[]
}
export const EditArticlePage = () => {
  const { isAuth, username: currentUsername, token } = useAuth()
  const location = useLocation()
  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  const dispatch = useAppDispatch()
  const { slug } = useParams()
  const { loading, error, articleData, editingStatus } = useAppSelector((state) => state.article)
  const { title, description, body, tagList, author } = articleData || {}
  const { username: authorUsername } = author || {}

  if (loading === 'succeeded' && currentUsername !== authorUsername) {
    return <Navigate to="/" />
  }
  useEffect(() => {
    if (isAuth && slug) {
      dispatch(getArticleData({ slug, token }))
    }
  }, [slug, dispatch, isAuth])

  const navigate = useNavigate()
  useEffect(() => {
    if (editingStatus === 'succeeded') {
      return navigate('/articles/' + slug)
    }
  }, [editingStatus, navigate, slug])

  const [form] = Form.useForm<FieldType>()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { title, description, body, tagList } = values
    if (slug && title && description && body) {
      const newArticleData = {
        slug,
        title,
        description,
        body,
        tagList: tagList ? tagList.map((tag) => tag.tag) : [],
        token: token || '',
      }
      dispatch(updateArticle(newArticleData))
    }
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  let formatedTagList: { tag: string }[]
  if (tagList) {
    formatedTagList = tagList.map((tag) => {
      return { tag: tag }
    })
  } else {
    formatedTagList = []
  }
  const initialValues = {
    title,
    description,
    body,
    tagList: formatedTagList,
  }
  useEffect(() => {
    form.setFieldsValue(initialValues)
  })

  return (
    <div className={styles.wrapper}>
      <SetContent status={loading} error={error}>
        <div className={styles.container}>
          <h1 className={styles.title}>Edit article</h1>
          <ArticleForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues} />
        </div>
      </SetContent>
    </div>
  )
}
