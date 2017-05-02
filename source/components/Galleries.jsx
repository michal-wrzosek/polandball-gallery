import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import bem from '../helpers/bem';
import './Galleries.scss';

const Galleries = ({
  galleries,
  handleClick,
}) => {
  const b = 'galleries';

  return (
    <div
      className={ bem(b) }
    >
      {galleries.get('list').valueSeq().map(i =>
        <div
          key={ i.get('id') }
          className={ bem(b, 'image') }
        >
          <img
            src={ i.get('coverThumbUrl') }
            alt=''
          />
          <a
            onClick={ handleClick.bind(null, i.get('id')) }
          >
            { `${ i.get('id') } - ${ i.get('isAlbum') }` }
          </a>
        </div>
      )}
    </div>
  );
};

Galleries.propTypes = {
  galleries: ImmutablePropTypes.mapContains({
    list: ImmutablePropTypes.list,
    keys: ImmutablePropTypes.map,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Galleries;
