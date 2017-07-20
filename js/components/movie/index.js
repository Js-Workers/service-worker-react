import React from 'react';
import styles from './movie.scss';

const Movie = ({movie}) => {
  return (
    <div className={styles['wrapper']}>
      <figure className={styles['collection-item']}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={styles.poster}/>
        <figcaption>
          <p className={styles['movie-title']}>{movie.title}</p>
          <p className={styles['movie-description']}>{movie.overview}</p>
          <div className={styles.rating}>Rating: {movie.vote_average}</div>
        </figcaption>
      </figure>
    </div>
  );
};

export default Movie;
