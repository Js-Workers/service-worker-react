import React, { Component } from 'react';

import Movie from '../movie';

import styles from './movies-list.scss';

class MoviesList extends Component {
  getMovies() {
    const {movies} = this.props;

    return movies.length ? movies.map(movie => <Movie key={movie.id} movie={movie} />) : 'Loading...';
  }

  render() {
    return (
      <div className={styles['collection-details']}>
        {this.getMovies()}
      </div>
    );
  }
}


export default MoviesList;
