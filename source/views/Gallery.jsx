import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import bem from '../helpers/bem';
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

    const b = 'gallery';

    return (
      <div className={ bem(b) }>

        {/* IMAGE */}
        <div className={ bem(b, 'image') }>
          { gallery.get('isAlbum') === false &&
            <img
              src={ gallery.get('coverUrl') }
              alt=''
              className={ bem(b, 'image-img') }
            />
          }
        </div>

        {/* ALBUM IMAGES */}
        <div className={ bem(b, 'album-images') }>
          {albumImages.map(image =>
            <div
              key={ image.get('id') }
              className={ bem(b, 'album-image') }
            >
              <img
                src={ image.get('url') }
                alt=''
                className={ bem(b, 'album-image-img') }
                width={ image.get('width') }
                height={ image.get('height') }
              />
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div className={ bem(b, 'comments') }>
          <div className={ bem(b, 'comments-header') }>
            Comments:
          </div>
          {comments.map(comment =>
            <div
              key={ comment.get('id') }
              className={ bem(b, 'comment') }
            >
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
