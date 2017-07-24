import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {loadMovies} from '../actions/movies';
import MoviesList from '../components/movies-list';
import Button from '../components/button';

class MoviesListContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };

    this.getMovies = this.getMovies.bind(this);
  }

  getMovies() {
    this.props.loadMovies().then(({payload}) => {
      this.setState({movies: payload.movies});
    });
  }

  render() {
    return (
      <div>
        {
          this.state.movies.length
            ? <MoviesList movies={this.state.movies}/>
            : <Button title="Load Movies" onClick={this.getMovies}/>
        }
      </div>
    );
  }
}

const mapActionsToProps = dispatch => bindActionCreators({loadMovies}, dispatch);

export default connect(null, mapActionsToProps)(MoviesListContainer);
