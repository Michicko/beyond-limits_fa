import clsx from 'clsx'
import React from 'react'
import styles from './Search.module.css';
import Text from '../main/Typography/Text';

function SearchError({error}: {error?: string}) {
  return (
    <div className={clsx(styles['search-box'])}>
      <Text color="white" letterCase={"lower"} size="base" weight="regular">
        {error}
      </Text>
    </div>
  )
}

export default SearchError