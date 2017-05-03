import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InfiniteScroll from 'redux-infinite-scroll';
import bem from '../helpers/bem';
import GalleryItem from './GalleryItem';
import Loader from './../components/Loader';

const Galleries = ({
  galleries,
  handleClick,
  handleLoadMore,
}) => {
  const b = 'galleries';

  return (
    <div
      className={ bem(b) }
    >
      <InfiniteScroll
        className={ bem(b, 'list') }
        loadMore={ handleLoadMore }
        hasMore={ galleries.get('hasMore') }
        loadingMore={ galleries.get('isLoading') }
        elementIsScrollable={ false }
      >
        {galleries.get('list').toArray().map(gallery =>
          <GalleryItem
            key={ gallery.get('id') }
            gallery={ gallery }
            handleClick={ handleClick }
          />
        )}
      </InfiniteScroll>
      {galleries.get('isLoading') === true &&
        <Loader />
      }
    </div>
  );
};

Galleries.propTypes = {
  galleries: ImmutablePropTypes.mapContains({
    list: ImmutablePropTypes.list.isRequired,
    keys: ImmutablePropTypes.map.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

export default Galleries;
