import { describe, it } from 'mocha';
import assert from 'assert';
import { call, put } from 'redux-saga/effects';
import { fetchImages } from '../api';
import { getImagesSucceeded } from '../actions';
import {
  getImagesAsync,
  searchAsync,
} from './rootSaga';

describe('sagas/rootSaga', () => {
  describe('getImagesAsync()', () => {
    const iterator = getImagesAsync();

    it('should work', () => {
      assert.deepEqual(
        iterator.next().value,
        call(fetchImages),
        'should call fetchImages()'
      );
    });

    const images = [{
      id: 1,
      width: 20,
      height: 20,
      url: 'testUrl',
      thumbUrl: 'thumbUrl',
    }];

    it('should work 2', () => {
      assert.deepEqual(
        iterator.next(images).value,
        put(getImagesSucceeded(images)),
        'hmmm...'
      );
    });

    // console.log(put(fetchImages));
  });
});