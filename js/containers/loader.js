import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/loader';

class LoaderContainer extends Component {
  render() {
    return (
      <Loader active={ this.props.loader } />
    );
  }
}

const mapStateToProps = ({ loader }) => ({ loader });

export default connect(mapStateToProps, null)(LoaderContainer);
