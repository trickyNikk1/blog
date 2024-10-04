import { Outlet } from 'react-router-dom'

import Header from '../header'

import styles from './layout.module.scss'
export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
