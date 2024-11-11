import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Article } from '@components/article'
import { getArticleData, reset } from '@store/articleSlice'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { SetContent } from '@hoc/set-content'

export function ArticlePage() {
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

  return (
    <>
      <SetContent status={loading} error={error}>
        <Article articleData={articleData} isArticlePage={true} />
      </SetContent>
    </>
  )
}
