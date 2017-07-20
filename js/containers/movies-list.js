import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {loadMovies} from '../actions/movies';
import MoviesList from '../components/movies-list';

class MoviesListContainer extends Component {
  componentWillMount() {
    this.props.loadMovies();
  }

  render() {
    return (
      <MoviesList movies={this.props.movies}/>
    );
  }
}

const mapStateToProps = ({ movies }) => ({ movies });
const mapActionsToProps = dispatch => bindActionCreators({loadMovies}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(MoviesListContainer);
