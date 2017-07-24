import React from 'react';
import styles from './movie.scss';
import {saveImgToCache, getImgFromCache} from '../../utils/images-cache';

const Movie = ({movie}) => {
  return (
    <div className={styles['wrapper']}>
      <figure className={styles['collection-item']}>
        <img onLoad={saveImgToCache} onError={getImgFromCache} crossOrigin='anonymous' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className={styles.poster} alt={movie.title}/>
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
