import { parseTagResponse } from '../api/apiHelpers';

export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGES_SUCCEEDED = 'GET_IMAGES_SUCCEEDED';
export const GET_IMAGES_FAILED = 'GET_IMAGES_FAILED';

export const getImages = () => ({
  type: GET_IMAGES,
});

export const getImagesSucceeded = (response) => {
  return {
    type: GET_IMAGES_SUCCEEDED,
    images: parseTagResponse(response),
  }
};

export const getImagesFailed = (error) => ({
  type: GET_IMAGES,
  error,
});