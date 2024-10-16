import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Alert } from 'antd'

import { getArticleData } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Article from '../../components/article'
export default function ArticlePage() {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!slug) return
    dispatch(getArticleData(slug))
  }, [dispatch, slug])
  const { articleData, error, loading } = useAppSelector((state) => state.article)

  const spinner = loading === 'pending' ? <Spin /> : null
  const errorMessage = error ? <Alert message={`${error.code} ${error.message}`} type="error" /> : null
  const article = articleData ? <Article articleData={articleData} isArticlePage={true} /> : null
  return (
    <>
      {spinner}
      {errorMessage}
      {article}
    </>
  )
}
