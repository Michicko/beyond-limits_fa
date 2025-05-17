import React from 'react'
import styles from './NewsClient.module.css';
import clsx from 'clsx';

function NewsSkeleton({loading}: {loading: boolean}) {
  return (
    <div className={clsx(styles.skeleton, loading ? styles.loading : "")}></div>
  )
}

export default NewsSkeleton