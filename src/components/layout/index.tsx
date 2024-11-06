import { Outlet } from 'react-router-dom'

import { Header } from '@components/header'

import styles from './layout.module.scss'
export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
