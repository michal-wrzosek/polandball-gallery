import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {
  getGallery,
  getGalleryComments,
  getGalleryAlbumImages,
} from '../selectors';

class Gallery extends Component {
  render() {
    const {
      gallery,
      comments,
      albumImages,
    } = this.props;

    return (
      <div>
        <div>
          { gallery.get('id') }
        </div>
        <div>
          { gallery.get('isAlbum') === false &&
            <img
              src={ gallery.get('coverUrl') }
              alt=''
            />
          }
        </div>
        <div>
          {albumImages.map(image =>
            <div key={ image.get('id') }>
              <img
                src={ image.get('url') }
                alt=''
              />
            </div>
          )}
        </div>
        <div>
          <p>Comments:</p>
          {comments.map(comment =>
            <div key={ comment.get('id') }>
              { comment.get('comment') }
            </div>
          )}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  gallery: ImmutablePropTypes.map.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  albumImages: ImmutablePropTypes.list.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const gallery = getGallery(state, ownProps.params.id);
  const comments = getGalleryComments(state, ownProps.params.id);
  const albumImages = getGalleryAlbumImages(state, ownProps.params.id);

  return {
    gallery,
    comments,
    albumImages,
  };
}

export default connect(mapStateToProps)(Gallery);