import React from 'react'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
      <p className={styles.loading__text}>Loading products...</p>
    </div>
  )
}

export default Loading
