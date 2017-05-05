import { expect } from 'chai';
import Immutable from 'immutable';
import {
  GET_GALLERIES,
  GET_GALLERIES_SUCCEEDED,
  SEARCH,
  SEARCH_SUCCEEDED,
  GALLERY_OPENED,
  HOMEPAGE_OPENED,
  GET_GALLERY_COMMENTS_SUCCEEDED,
  GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
} from '../actions';
import galleriesReducer, { initialState } from './galleriesReducer';

describe('reducers/galleriesReducer()', () => {

  const stateLaterOn = Immutable.fromJS({
    list: [
      { id: 'gallery1' },
      { id: 'gallery2' },
    ],
    keys: {
      gallery1: 0,
      gallery2: 1,
    },
    currentGallery: '',
    galleryComments: {
      gallery1: [
        { id: 'comment1' },
        { id: 'comment2' },
      ],
    },
    galleryAlbumImages: {
      gallery1: [
        { id: 'image1' },
        { id: 'image2' },
      ],
    },
    currentPage: 2,
    hasMore: true,
    isLoading: false,
  });

  it('should return the initial state', () => {
    expect(galleriesReducer(undefined, {}))
      .to.be.deep.equal(initialState);
  });

  it('should handle GET_GALLERIES', () => {
    const newState = galleriesReducer(undefined, {
      type: GET_GALLERIES,
    });
    expect(newState.get('isLoading')).to.be.equal(true);
    expect(newState.get('currentPage')).to.be.equal(0);
  });

  it('should handle GET_GALLERIES_SUCCEEDED', () => {
    const newState = galleriesReducer(stateLaterOn, {
      type: GET_GALLERIES_SUCCEEDED,
      galleries: [
        { id: 'gallery1' },
        { id: 'gallery3' },
      ],
    });
    expect(newState.get('isLoading')).to.be.equal(false);
    expect(newState.get('hasMore')).to.be.equal(true);
    expect(newState.get('list').size).to.be.equal(3);
    expect(newState.get('list').get(2).get('id')).to.be.equal('gallery3');
    expect(newState.get('keys').size).to.be.equal(3);
    expect(newState.get('keys').get('gallery3')).to.be.equal(2);
  });

  it('should handle SEARCH', () => {
    const searchPhrase = 'test phrase';
    const newState = galleriesReducer(stateLaterOn, {
      type: SEARCH,
      searchPhrase,
    });

    expect(newState.get('isLoading')).to.be.equal(true);
    expect(newState.get('currentPage')).to.be.equal(0);
    expect(newState.get('searchPhrase')).to.be.equal(searchPhrase);
    expect(newState.get('list').size).to.be.equal(0);
    expect(newState.get('keys').size).to.be.equal(0);
  });

  it('should handle SEARCH_SUCCEEDED', () => {
    const newState = galleriesReducer(undefined, {
      type: SEARCH_SUCCEEDED,
      galleries: [
        { id: 'gallery1' },
        { id: 'gallery2' },
        { id: 'gallery3' },
        { id: 'gallery1' },
      ],
    });

    expect(newState.get('list').size).to.be.equal(3);
    expect(newState.get('keys').size).to.be.equal(3);
    expect(newState.get('keys').get('gallery1')).to.be.equal(0);
    expect(newState.get('hasMore')).to.be.equal(true);
    expect(newState.get('isLoading')).to.be.equal(false);
  });

  it('should handle GALLERY_OPENED', () => {
    const newState = galleriesReducer(undefined, {
      type: GALLERY_OPENED,
      id: 'galleryid',
    });

    expect(newState.get('currentGallery')).to.be.equal('galleryid');
  });

  it('should handle HOMEPAGE_OPENED', () => {
    const newState = galleriesReducer(undefined, {
      type: HOMEPAGE_OPENED,
    });

    expect(newState.get('currentGallery')).to.be.equal('');
  });

  it('should handle GET_GALLERY_COMMENTS_SUCCEEDED', () => {
    const newState = galleriesReducer(stateLaterOn, {
      type: GET_GALLERY_COMMENTS_SUCCEEDED,
      id: 'gallery2',
      comments: [
        { id: 'comment1' },
        { id: 'comment2' },
      ],
    });

    expect(newState.get('galleryComments').size).to.be.equal(2);
    expect(newState.get('galleryComments').get('gallery2').size)
      .to.be.equal(2);
  });

  it('should handle GET_GALLERY_ALBUM_IMAGES_SUCCEEDED', () => {
    const newState = galleriesReducer(stateLaterOn, {
      type: GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
      id: 'gallery2',
      images: [
        { id: 'image1' },
        { id: 'image2' },
      ],
    });

    expect(newState.get('galleryAlbumImages').size).to.be.equal(2);
    expect(newState.get('galleryAlbumImages').get('gallery2').size)
      .to.be.equal(2);
  });
});
