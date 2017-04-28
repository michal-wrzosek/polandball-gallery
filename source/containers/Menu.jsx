import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import routes from '../routes';

class Menu extends Component {

  render() {
    return (
      <div className='Menu'>
        <IndexLink to={ routes.HOMEPAGE }>
          Homepage
        </IndexLink>
      </div>
    );
  }
}

export default Menu;
