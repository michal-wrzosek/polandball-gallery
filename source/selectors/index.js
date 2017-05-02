import { List } from 'immutable';

export const getGallery = (state, id) => {
  const listIndex = state.galleries.get('keys').get(id);
  return state.galleries.get('list').get(listIndex);
};

export const getGalleryComments = (state, id) =>
  state.galleries.get('galleryComments').get(id) || List();

export const getGalleryAlbumImages = (state, id) =>
  state.galleries.get('galleryAlbumImages').get(id) || List();
