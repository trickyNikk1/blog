import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header.module.scss'
export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink className={styles.link_home + ' ' + styles.link} to="/">
        Realworld Blog
      </NavLink>
      <div className={styles.links}>
        <NavLink className={styles.link_signIn + ' ' + styles.link} to="/sign-in">
          Sign In
        </NavLink>
        <NavLink className={styles.link_signUp + ' ' + styles.link} to="/sign-up">
          Sign Up
        </NavLink>
      </div>
    </header>
  )
}
