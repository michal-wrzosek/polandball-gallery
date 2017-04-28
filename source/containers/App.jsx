import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';

class App extends Component {
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
  children: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
