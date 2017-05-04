import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';
import {
  fetchGalleries,
  fetchGalleryComments,
  fetchGalleryAlbumImages,
} from '../api';
import {
  GET_GALLERIES,
  getGalleriesSucceeded,
  getGalleriesFailed,
  SEARCH,
  searchSucceeded,
  searchFailed,
  GALLERY_OPENED,
  galleryOpened,
  homepageOpened,
  getGalleryComments,
  getGalleryCommentsSucceeded,
  getGalleryCommentsFailed,
  getGalleryAlbumImages,
  getGalleryAlbumImagesSucceeded,
  getGalleryAlbumImagesFailed,
} from '../actions';
import {
  getGallery,
} from '../selectors';


// WORKERS
export function* getGalleriesAsync(action) {
  const { response, error } = yield call(fetchGalleries, {
    page: action.page,
    searchPhrase: action.searchPhrase,
  });

  if (response) {
    yield put(getGalleriesSucceeded(response.galleries));
  } else {
    yield put(getGalleriesFailed(error));
  }
}

export function* searchAsync(action) {
  const { response, error } = yield call(fetchGalleries, {
    searchPhrase: action.searchPhrase,
  });

  if (response) {
    yield put(searchSucceeded(response.galleries));
  } else {
    yield put(searchFailed(error));
  }
}

export function* logLocation(action) {
  if (action.payload.pathname.includes('/galleries/')) {
    yield put(galleryOpened(action.payload.pathname.split('/')[2]));
  } else if (action.payload.pathname === '/') {
    yield put(homepageOpened());
  }
}

export function* redirectIfGalleryNotExists(action) {
  const gallery = yield select(getGallery, action.id);

  if (gallery === false) {
    yield put(push('/'));
  }
}

export function* getGalleryCommentsAsync(action) {
  const gallery = yield select(getGallery, action.id);

  if (gallery) {
    yield put(getGalleryComments(action.id));
    const { response, error } = yield call(
      fetchGalleryComments,
      action.id,
      gallery.get('isAlbum')
    );

    if (response) {
      yield put(getGalleryCommentsSucceeded(action.id, response.comments));
    } else {
      yield put(getGalleryCommentsFailed(action.id, error));
    }
  }
}

export function* getGalleryAlbumImagesAsync(action) {
  const gallery = yield select(getGallery, action.id);

  if (gallery && gallery.get('isAlbum') === true) {
    yield put(getGalleryAlbumImages(action.id));
    const { response, error } = yield call(fetchGalleryAlbumImages, action.id);

    if (response) {
      yield put(getGalleryAlbumImagesSucceeded(action.id, response.images));
    } else {
      yield put(getGalleryAlbumImagesFailed(action.id, error));
    }
  }
}


// WATCHERS
export function* watchGetGalleries() {
  yield takeLatest(GET_GALLERIES, getGalleriesAsync);
}

export function* watchSearch() {
  yield takeLatest(SEARCH, searchAsync);
}

export function* watchLocationChange() {
  yield takeLatest(LOCATION_CHANGE, logLocation);
}

export function* watchGalleryOpened() {
  yield takeLatest(GALLERY_OPENED, redirectIfGalleryNotExists);
  yield takeLatest(GALLERY_OPENED, getGalleryCommentsAsync);
  yield takeLatest(GALLERY_OPENED, getGalleryAlbumImagesAsync);
}


// ROOT SAGA
export default function* rootSaga() {
  yield all([
    call(watchGetGalleries),
    call(watchSearch),
    call(watchLocationChange),
    call(watchGalleryOpened),
  ]);
}
