import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getImages,
} from '../actions';
import Menu from './Menu';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getImages());
  }

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <Menu />

        <div className='Page'>
          { children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
