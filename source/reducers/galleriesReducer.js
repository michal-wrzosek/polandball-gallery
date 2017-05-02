import Immutable, { Map } from 'immutable';
import {
  GET_GALLERIES_SUCCEEDED,
  SEARCH_SUCCEEDED,
  GALLERY_OPENED,
  HOMEPAGE_OPENED,
  GET_GALLERY_COMMENTS_SUCCEEDED,
  GET_GALLERY_ALBUM_IMAGES_SUCCEEDED,
} from '../actions';

const initialState = Immutable.fromJS({
  list: [],
  keys: {},
  currentGallery: '',
  galleryComments: {},
  galleryAlbumImages: {},
});

const actionsMap = {
  [GET_GALLERIES_SUCCEEDED]: (state, action) => {
    const newState = {
      ...state.toJS(),
      list: [],
      keys: {},
    };
    
    action.galleries.forEach(i => {
      if (!(i.id in newState.keys)) {
        newState.list.push(i);
        newState.keys[i.id] = newState.list.length - 1;
      }
    });

    return Immutable.fromJS(newState);
  },
  [SEARCH_SUCCEEDED]: (state, action) => {
    const newState = state.merge({
      ...state.toJS(),
      list: [],
      keys: {},
    });
    
    action.galleries.forEach(i => {
      if (!(i.id in newState.keys)) {
        newState.list.push(i);
        newState.keys[i.id] = newState.list.length - 1;
      }
    });

    return Immutable.fromJS(newState);
  },
  [GALLERY_OPENED]: (state, action) => state.set('currentGallery', action.id),
  [HOMEPAGE_OPENED]: (state) => state.set('currentGallery', ''),
  [GET_GALLERY_COMMENTS_SUCCEEDED]: (state, action) =>
    state.setIn(
      ['galleryComments', action.id],
      Immutable.fromJS(action.comments)
    ),
  [GET_GALLERY_ALBUM_IMAGES_SUCCEEDED]: (state, action) =>
    state.setIn(
      ['galleryAlbumImages', action.id],
      Immutable.fromJS(action.images)
    ),
};

export default function imagesReducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
