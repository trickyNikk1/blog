import React from 'react'
import { useSearchParams } from 'react-router-dom'

import ArticlesList from '../articles-list'
export default function ArticlesListPage() {
  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  return <ArticlesList page={pageNumber} />
}
