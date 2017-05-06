import React from 'react';
import PropTypes from 'prop-types';
import bem from '../helpers/bem';

const Menu = ({ elements, handleClick }) => {
  const b = 'menu';

  return (
    <ul className={ bem(b) }>
      {elements.map(element => 
        <li
          key={ element.path }
          className={ bem(b, 'link') }
        >
          <a
            onClick={ () => handleClick(element.path) }
            className={ bem(b, 'link-a') }
          >
            {element.name}
          </a>
        </li>
      )}
    </ul>
  );
};

Menu.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Menu;
