import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchImages,
} from '../api';
import {
  GET_IMAGES,
  getImagesSucceeded,
  getImagesFailed,
  SEARCH,
  searchSucceeded,
  searchFailed,
} from '../actions';

// WORKERS
export function* getImagesAsync(action) {
  const { response, error } = yield call(fetchImages);

  if (response) {
    yield put(getImagesSucceeded(response.images));
  } else {
    yield put(getImagesFailed(error));
  }
}

export function* searchAsync(action) {
  const {response, error } = yield call(fetchImages, {
    searchPhrase: action.searchPhrase
  });

  if (response) {
    yield put(searchSucceeded(response.images));
  } else {
    yield put(searchFailed(error));
  }
}

// WATCHERS
export function* watchGetImages() {
  yield takeEvery(GET_IMAGES, getImagesAsync);
}

export function* watchSearch() {
  yield takeEvery(SEARCH, searchAsync);
}


// ROOT SAGA
export default function* rootSaga() {
  yield [
    watchGetImages(),
    watchSearch(),
  ]
}