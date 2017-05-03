import React from 'react';
import PropTypes from 'prop-types';
import bem from '../helpers/bem';

const Menu = ({ handleClick }) => {
  const b = 'menu';

  return (
    <ul className={ bem(b) }>
      <li className={ bem(b, 'link') }>
        <a
          onClick={ () => handleClick('/') }
          className={ bem(b, 'link-a') }
        >
          Polandballs
        </a>
      </li>
    </ul>
  );
};

Menu.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Menu;
