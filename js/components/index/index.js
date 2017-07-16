import React, {Component} from 'react';
import serviceWorker from '../../../webpack/loaders/sw-loader?name=/sw.worker.js!../../workers/sw.js';

class Index extends Component {
  componentDidMount() {
    serviceWorker({scope: '/'})
    .then(data => {
      console.count();
      console.error('Success: ', data);
    })
    .catch(error => console.error('Error: ', error));
  }

  render() {
    console.error('render');
    return (
      <div>
        Hello Index
      </div>
    );
  }
}

export default Index;
