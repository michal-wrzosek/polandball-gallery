import {
  expect
} from 'chai';
import {
  GET_GALLERIES,
  GET_GALLERIES_SUCCEEDED,
  GET_GALLERIES_FAILED,
  SEARCH,
  SEARCH_SUCCEEDED,
  SEARCH_FAILED,
  GALLERY_OPENED,
  HOMEPAGE_OPENED,
  GET_GALLERY_COMMENTS,
  GET_GALLERY_COMMENTS_SUCCEEDED,
  GET_GALLERY_COMMENTS_FAILED,
  GET_GALLERY_ALBUM_IMAGES,
  GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
  GET_GALLERY_ALBUM_IMAGES_FAILED,
  getGalleries,
  getGalleriesSucceeded,
  getGalleriesFailed,
  search,
  searchSucceeded,
  searchFailed,
  galleryOpened,
  homepageOpened,
  getGalleryComments,
  getGalleryCommentsSucceeded,
  getGalleryCommentsFailed,
  getGalleryAlbumImages,
  getGalleryAlbumImagesSucceeded,
  getGalleryAlbumImagesFailed,
} from './index';

describe('actions', () => {
  describe('getGalleries()', () => {
    it('should create an action GET_GALLERIES', () => {
      const page = 3;
      const searchPhrase = 'test phrase';
      const expectedAction = {
        type: GET_GALLERIES,
        page,
        searchPhrase,
      };
      expect(getGalleries(page, searchPhrase)).to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleriesSucceeded()', () => {
    it('should create an action GET_GALLERIES_SUCCEEDED', () => {
      const galleries = [{}, {}];
      const expectedAction = {
        type: GET_GALLERIES_SUCCEEDED,
        galleries,
      };
      expect(getGalleriesSucceeded(galleries)).to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleriesFailed()', () => {
    it('should create an action GET_GALLERIES_FAILED', () => {
      const error = { message: 'something' };
      const expectedAction = {
        type: GET_GALLERIES_FAILED,
        error,
      };
      expect(getGalleriesFailed(error)).to.be.deep.equal(expectedAction);
    });
  });

  describe('search()', () => {
    it('should create an action SEARCH', () => {
      const searchPhrase = 'test phrase';
      const expectedAction = {
        type: SEARCH,
        searchPhrase,
      };
      expect(search(searchPhrase)).to.be.deep.equal(expectedAction);
    });
  });

  describe('searchSucceeded()', () => {
    it('should create an action SEARCH_SUCCEEDED', () => {
      const galleries = [{}, {}];
      const expectedAction = {
        type: SEARCH_SUCCEEDED,
        galleries,
      };
      expect(searchSucceeded(galleries)).to.be.deep.equal(expectedAction);
    });
  });

  describe('searchFailed()', () => {
    it('should create an action SEARCH_FAILED', () => {
      const error = { message: 'something' };
      const expectedAction = {
        type: SEARCH_FAILED,
        error,
      };
      expect(searchFailed(error)).to.be.deep.equal(expectedAction);
    });
  });

  describe('galleryOpened()', () => {
    it('should create an action GALLERY_OPENED', () => {
      const id = 'sdafss';
      const expectedAction = {
        type: GALLERY_OPENED,
        id,
      };
      expect(galleryOpened(id)).to.be.deep.equal(expectedAction);
    });
  });

  describe('homepageOpened()', () => {
    it('should create an action HOMEPAGE_OPENED', () => {
      const expectedAction = {
        type: HOMEPAGE_OPENED,
      };
      expect(homepageOpened()).to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryComments()', () => {
    it('should create an action GET_GALLERY_COMMENTS', () => {
      const id = 'fghfg'
      const expectedAction = {
        type: GET_GALLERY_COMMENTS,
        id,
      };
      expect(getGalleryComments(id)).to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryCommentsSucceeded()', () => {
    it('should create an action GET_GALLERY_COMMENTS_SUCCEEDED', () => {
      const id = 'fgfdgd';
      const comments = [{}, {}];
      const expectedAction = {
        type: GET_GALLERY_COMMENTS_SUCCEEDED,
        id,
        comments,
      };
      expect(getGalleryCommentsSucceeded(id, comments))
        .to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryCommentsFailed()', () => {
    it('should create an action GET_GALLERY_COMMENTS_FAILED', () => {
      const id = 'fgfdgd';
      const error = { message: 'some error message' };
      const expectedAction = {
        type: GET_GALLERY_COMMENTS_FAILED,
        id,
        error,
      };
      expect(getGalleryCommentsFailed(id, error))
        .to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryAlbumImages()', () => {
    it('should create an action GET_GALLERY_ALBUM_IMAGES', () => {
      const id = 'fghfg'
      const expectedAction = {
        type: GET_GALLERY_ALBUM_IMAGES,
        id,
      };
      expect(getGalleryAlbumImages(id)).to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryAlbumImagesSucceeded()', () => {
    it('should create an action GET_GALLERY_ALBUM_IMAGES_SUCCEEDED', () => {
      const id = 'fgfdgd';
      const images = [{}, {}];
      const expectedAction = {
        type: GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
        id,
        images,
      };
      expect(getGalleryAlbumImagesSucceeded(id, images))
        .to.be.deep.equal(expectedAction);
    });
  });

  describe('getGalleryAlbumImagesFailed()', () => {
    it('should create an action GET_GALLERY_ALBUM_IMAGES_FAILED', () => {
      const id = 'fgfdgd';
      const error = { message: 'some error message' };
      const expectedAction = {
        type: GET_GALLERY_ALBUM_IMAGES_FAILED,
        id,
        error,
      };
      expect(getGalleryAlbumImagesFailed(id, error))
        .to.be.deep.equal(expectedAction);
    });
  });
});