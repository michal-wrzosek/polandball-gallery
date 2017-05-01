export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGES_SUCCEEDED = 'GET_IMAGES_SUCCEEDED';
export const GET_IMAGES_FAILED = 'GET_IMAGES_FAILED';
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const getImages = () => ({
  type: GET_IMAGES,
});

export const getImagesSucceeded = (images) => ({
  type: GET_IMAGES_SUCCEEDED,
  images,
});

export const getImagesFailed = (error) => ({
  type: GET_IMAGES_FAILED,
  error,
});

export const search = (searchPhrase) => ({
  type: SEARCH,
  searchPhrase,
});

export const searchSucceeded = (images) => ({
  type: SEARCH_SUCCEEDED,
  images,
});

export const searchFailed = (error) => ({
  type: SEARCH_FAILED,
  error,
});