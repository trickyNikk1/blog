import React, { FC } from 'react'

import { ReactComponent as HeartIconFilled } from '@svgs/heart_filled.svg'
import { ReactComponent as HeartIcon } from '@svgs/heart.svg'

import styles from './heart.module.scss'
type HeartProps = {
  isAuth: boolean
  favorited: boolean
  counter: number
  clickHeartHandler: () => void
}
export const Heart: FC<HeartProps> = ({ favorited, counter, isAuth, clickHeartHandler }) => {
  return (
    <div className={styles.heart}>
      <button disabled={!isAuth} onClick={clickHeartHandler} className={styles.button_heart} type="button">
        {favorited ? <HeartIconFilled className={styles.icon} /> : <HeartIcon className={styles.icon} />}
      </button>
      <div className={styles.counter}>{counter}</div>
    </div>
  )
}
