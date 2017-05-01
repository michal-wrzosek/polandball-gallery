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

export function* getImagesAsync(action) {
  try {
    const images = yield call(fetchImages);
    yield put(getImagesSucceeded(images));
  } catch (e) {
    yield put(getImagesFailed(e.message));
  }
}

export function* searchAsync(action) {
  try {
    const images = yield call(fetchImages, { search: action.searchPhrase });
    yield put(searchSucceeded(images));
  } catch (e) {
    yield put(searchFailed(e.message));
  }
}

export function* watchGetImages() {
  yield takeEvery(GET_IMAGES, getImagesAsync);
}

export function* watchSearch() {
  yield takeEvery(SEARCH, searchAsync);
}

export default function* rootSaga() {
  yield [
    watchGetImages(),
    watchSearch(),
  ]
}