import React, { Component } from 'react';
import { IndexLink } from 'react-router';

class Menu extends Component {

  render() {
    return (
      <div className='Menu'>
        <IndexLink to='/'>
          Homepage
        </IndexLink>
      </div>
    );
  }
}

export default Menu;
