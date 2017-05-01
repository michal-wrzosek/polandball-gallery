import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import bem from '../helpers/bem';
import './Images.scss';

const Images = ({
  images,
}) => {
  const b = 'images';
  return (
    <div
      className={bem(b)}
    >
      {images.valueSeq().map(i =>
        <div
          key={i.get('id')}
          className={bem(b, 'image')}
        >
          <img
            src={i.get('thumbUrl')}
          />
        </div>
      )}
    </div>
  );
};

Images.propTypes = {
  images: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
};

export default Images;