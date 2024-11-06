import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Pagination, Spin, Alert, ConfigProvider } from 'antd'

import { getArticlesData } from '@store/articlesSlice'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { Article } from '@components/article'

import styles from './articles-list-page.module.scss'
export function ArticlesListPage() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAuth()
  useEffect(() => {
    dispatch(getArticlesData({ page, token }))
  }, [dispatch, page])
  const { articles: data, articlesCount, loading, error } = useAppSelector((state) => state.articles)
  const articles = data.map((articleData) => {
    return <Article key={articleData.slug} articleData={articleData} />
  })
  const spinner = loading === 'pending' ? <Spin fullscreen={true} /> : null
  const errorMessage = error ? <Alert message={`Ooops! ${error.message}`} type="error" /> : null
  return (
    <>
      <section className={styles.list}>
        {spinner}
        {errorMessage}
        {articles}
      </section>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
              itemBg: 'none',
            },
          },
          token: {
            colorPrimary: 'white',
            colorPrimaryBorder: '#1890FF',
            colorPrimaryActive: 'white',
            colorPrimaryHover: 'white',
          },
        }}
      >
        <Pagination
          className={styles.pagination}
          showSizeChanger={false}
          pageSize={5}
          defaultCurrent={1}
          current={page}
          total={articlesCount}
          onChange={(page) => navigate(`/articles/?page=${page}`)}
          align={'center'}
        />
      </ConfigProvider>
    </>
  )
}
