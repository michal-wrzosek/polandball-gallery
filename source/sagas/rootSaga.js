import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_IMAGES,
  getImagesSucceeded,
  getImagesFailed,
} from '../actions'

const apiUrl = 'https://api.imgur.com/3/';
axios.defaults.headers.common['Authorization'] = 'Client-ID 7b1f7a9c25b701b';

export function* getImagesAsync(action) {
  try {
    const response = yield call(axios.get, `${apiUrl}gallery/t/polandball`);
    yield put(getImagesSucceeded(response.data));
  } catch (e) {
    yield put(getImagesFailed(e.message));
  }
}

export function* watchGetImages() {
  yield takeEvery(GET_IMAGES, getImagesAsync);
}

export default function* rootSaga() {
  yield [
    watchGetImages(),
  ]
}