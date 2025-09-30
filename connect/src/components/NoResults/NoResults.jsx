import React from 'react'
import styles from './NoResults.module.scss'

const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <h3 className={styles.noResults__title}>No items match your search</h3>
      <p className={styles.noResults__message}>Try different keywords or check spelling</p>
    </div>
  )
}

export default NoResults
