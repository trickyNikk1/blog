import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spin, Alert } from 'antd'

import { getArticleData, reset } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks'
import Article from '../../components/article'

export default function ArticlePage() {
  const { token } = useAuth()
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reset())
    if (!slug) return
    dispatch(getArticleData({ slug, token }))
  }, [dispatch, slug])
  const navigate = useNavigate()
  const { deleteStatus } = useAppSelector((state) => state.article)
  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      navigate('/')
      dispatch(reset())
    }
  }, [deleteStatus, navigate, dispatch])
  const { articleData, error, loading } = useAppSelector((state) => state.article)

  const spinner = loading === 'pending' ? <Spin fullscreen={true} /> : null
  const errorMessage = error ? <Alert message={`${error}`} type="error" /> : null
  const article = articleData ? <Article articleData={articleData} isArticlePage={true} /> : null
  return (
    <>
      {spinner}
      {errorMessage}
      {article}
    </>
  )
}
