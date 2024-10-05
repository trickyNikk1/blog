import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Pagination, Spin, Alert, ConfigProvider } from 'antd'

import { getArticlesData } from '../../store/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Article from '../../components/article'

import styles from './articles-list-page.module.scss'
export default function ArticlesListPage() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getArticlesData(page))
  }, [dispatch, page])
  const { articles: data, articlesCount, loading, error } = useAppSelector((state) => state.ArticlesSlice)
  const articles = data.map((articleData) => {
    return <Article key={articleData.slug} articleData={articleData} />
  })
  const spinner = loading === 'pending' ? <Spin /> : null
  const errorMessage = error ? <Alert message={error} type="error" /> : null
  return (
    <>
      <div className={styles.list}>
        {spinner}
        {errorMessage}
        {articles}
      </div>
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
