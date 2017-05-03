import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import bem from '../helpers/bem';

const GalleryItem = ({ gallery, handleClick }) => {
  const b = 'gallery-item';

  return (
    <div
      className={ bem(b) }
      id={ `GalleryItem_${ gallery.get('id') }` }
    >

      {/* WRAPPER */}
      <div
        className={ bem(b, 'wrapper') }
        onClick={ () => handleClick(gallery.get('id')) }
      >

        {/* IMG */}
        <img
          className={ bem(b, 'img') }
          src={ gallery.get('coverThumbUrl') }
          alt=''
          width={ 160 }
          height={ 160 }
        />
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  gallery: ImmutablePropTypes.map.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default GalleryItem;
