import * as React from 'react';
import './loader.scss';

export default class Loader extends React.Component {
  render() {
    return <div className="loader" role="status" aria-label="Loading"></div>;
  }
}
