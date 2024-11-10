import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector, useAuth } from '../../hooks'
import { logout } from '../../store/authSlice'

import styles from './header.module.scss'
export function Header() {
  const { isAuth } = useAuth()

  const dispatch = useAppDispatch()

  const { username, image } = useAppSelector((state) => state.auth.user)

  return (
    <header className={styles.header}>
      <NavLink className={styles.link_home + ' ' + styles.link} to="/">
        Realworld Blog
      </NavLink>
      {isAuth ? (
        <div className={styles.inner}>
          <NavLink className={styles.link_newArticle + ' ' + styles.link} to="/new-article">
            Create article
          </NavLink>
          <NavLink className={styles.link_profile + ' ' + styles.link} to="/profile">
            <span className={styles.username}>{username}</span>
            <div className={styles['avatar-wrapper']}>
              <img
                className={styles.avatar}
                src={image ? image : require('../../assets/images/avatar.png')}
                alt={username ? username : 'default avatar'}
              />
            </div>
          </NavLink>
          <button type="button" className={styles.button_logout + ' ' + styles.link} onClick={() => dispatch(logout())}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.inner}>
          <NavLink className={styles.link_signIn + ' ' + styles.link} to="/sign-in">
            Sign In
          </NavLink>
          <NavLink className={styles.link_signUp + ' ' + styles.link} to="/sign-up">
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  )
}
