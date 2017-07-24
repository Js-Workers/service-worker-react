import React from 'react';

import styles from './button.scss';

const Button = ({title, onClick}) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
