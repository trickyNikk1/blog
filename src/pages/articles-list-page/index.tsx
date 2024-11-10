import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Pagination, ConfigProvider } from 'antd'

import { getArticlesData } from '@store/articlesSlice'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { Article } from '@components/article'
import { SetContent } from '@hoc/set-content'

import styles from './articles-list-page.module.scss'
export function ArticlesListPage() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAuth()
  const { articles: data, articlesCount, loading, error } = useAppSelector((state) => state.articles)

  useEffect(() => {
    dispatch(getArticlesData({ page, token }))
  }, [dispatch, page])

  return (
    <>
      <section className={styles.list}>
        <SetContent status={loading} error={error}>
          {data.map((articleData) => {
            return <Article key={articleData.slug} articleData={articleData} />
          })}
        </SetContent>
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
