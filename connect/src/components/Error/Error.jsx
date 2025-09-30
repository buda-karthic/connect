import React from 'react'
import styles from './Error.module.scss'

const Error = ({ error, onRetry }) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Oops! Something went wrong</h2>
      <p className={styles.error__message}>{error}</p>
      <button onClick={onRetry} className={styles.error__button}>
        Try Again
      </button>
    </div>
  )
}

export default Error
