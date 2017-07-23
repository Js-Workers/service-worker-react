import React from 'react';

import styles from './loader.scss';

const Loader = ({ active }) => {
  return (
    <div className={ active ? styles['loader-wrapper'] : 'hidden' }>
      <div className={ styles.loader } />
    </div>
  );
};

export default Loader;
