import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '../layout'
import ArticlesListPage from '../pages/articles-list-page'
import ArticlePage from '../pages/article-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'
import NotFoundPage from '../pages/not-found-page'

import styles from './app.module.scss'

export default function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<ArticlesListPage />} />
          <Route path="articles" element={<ArticlesListPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="articles/?page=:page" element={<ArticlesListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}
