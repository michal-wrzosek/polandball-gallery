export const GET_GALLERIES = 'GET_IMAGES';
export const GET_GALLERIES_SUCCEEDED = 'GET_IMAGES_SUCCEEDED';
export const GET_GALLERIES_FAILED = 'GET_IMAGES_FAILED';
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const GALLERY_OPENED = 'IMAGE_OPENED';
export const HOMEPAGE_OPENED = 'HOMEPAGE_OPENED';
export const GET_GALLERY_COMMENTS = 'GET_GALLERY_COMMENTS';
export const GET_GALLERY_COMMENTS_SUCCEEDED = 'GET_GALLERY_COMMENTS_SUCCEEDED';
export const GET_GALLERY_COMMENTS_FAILED = 'GET_GALLERY_COMMENTS_FAILED';
export const GET_GALLERY_ALBUM_IMAGES = 'GET_GALLERY_ALBUM_IMAGES';
export const GET_GALLERY_ALBUM_IMAGES_SUCCEEDED = 'GET_GALLERY_ALBUM_IMAGES_SUCCEEDED';
export const GET_GALLERY_ALBUM_IMAGES_FAILED = 'GET_GALLERY_ALBUM_IMAGES_FAILED';

export const getGalleries = () => ({
  type: GET_GALLERIES,
});

export const getGalleriesSucceeded = (galleries) => ({
  type: GET_GALLERIES_SUCCEEDED,
  galleries,
});

export const getGalleriesFailed = (error) => ({
  type: GET_GALLERIES_FAILED,
  error,
});

export const search = (searchPhrase) => ({
  type: SEARCH,
  searchPhrase,
});

export const searchSucceeded = (galleries) => ({
  type: SEARCH_SUCCEEDED,
  galleries,
});

export const searchFailed = (error) => ({
  type: SEARCH_FAILED,
  error,
});

export const galleryOpened = (id) => ({
  type: GALLERY_OPENED,
  id,
});

export const homepageOpened = () => ({
  type: HOMEPAGE_OPENED,
});

export const getGalleryComments = (id) => ({
  type: GET_GALLERY_COMMENTS,
  id,
});

export const getGalleryCommentsSucceeded = (id, comments) => ({
  type: GET_GALLERY_COMMENTS_SUCCEEDED,
  id,
  comments,
});

export const getGalleryCommentsFailed = (id, error) => ({
  type: GET_GALLERY_COMMENTS_FAILED,
  id,
  error,
});

export const getGalleryAlbumImages = id => ({
  type: GET_GALLERY_ALBUM_IMAGES,
  id,
});

export const getGalleryAlbumImagesSucceeded = (id, images) => ({
  type: GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
  id,
  images,
});

export const getGalleryAlbumImagesFailed = (id, error) => ({
  type: GET_GALLERY_ALBUM_IMAGES_FAILED,
  id,
  error,
});
