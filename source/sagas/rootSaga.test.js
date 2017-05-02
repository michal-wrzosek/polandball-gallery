import { describe, it } from 'mocha';
import assert from 'assert';
import { call, put, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { fetchImages } from '../api';
import {
  GET_IMAGES,
  SEARCH,
  getImagesSucceeded,
  getImagesFailed,
  searchSucceeded,
  searchFailed,
} from '../actions';
import {
  watchGetImages,
  watchSearch,
  getImagesAsync,
  searchAsync,
} from './rootSaga';

describe('sagas/rootSaga', () => {
  
  describe('watchGetImages()', () => {
    const gen = watchGetImages();

    it('should takeEvery GET_IMAGES actions and call getImagesAsync()', () => {
      assert.deepEqual(
        gen.next().value,
        takeEvery(GET_IMAGES, getImagesAsync)
      );
    });

    it('should be done', () => {
      assert.deepEqual(
        gen.next().done,
        true
      );
    });
  });

  describe('getImagesAsync()', () => {
    const data = {};
    data.gen = cloneableGenerator(getImagesAsync)();

    it('should call fetchImages()', () => {
      assert.deepEqual(
        data.gen.next().value,
        call(fetchImages)
      );
    });


    describe('when api works fine', () => {
      const successfulResponse = {
        response: {
          images: [
            {
              id: 'zzfw',
              width: 20,
              height: 20,
              url: 'http://example.com/zzz.jpg',
              thumbUrl: 'http://example.com/zzzs.jpg',
            },
          ],
        },
      };

      it('should dispatch getImagesSucceeded() action', () => {
        data.clone = data.gen.clone();
        assert.deepEqual(
          data.gen.next(successfulResponse).value,
          put(getImagesSucceeded(successfulResponse.response.images))
        );
      });

      it('should be done', () => {
        assert.deepEqual(
          data.gen.next().done,
          true
        );
      });
    });

    describe('when api throw an error', () => {
      const errorResponse = { error: {} };

      it('should dispatch getImagesFailed() action', () => {
        assert.deepEqual(
          data.clone.next(errorResponse).value,
          put(getImagesFailed(errorResponse.error))
        );
      })

      it('should be done', () => {
        assert.deepEqual(
          data.clone.next().done,
          true
        );
      });
    });
  });

  describe('watchSearch()', () => {
    const gen = watchSearch();

    it('should takeEvery SEARCH actions and call searchAsync()', () => {
      assert.deepEqual(
        gen.next().value,
        takeEvery(SEARCH, searchAsync)
      );
    });

    it('should be done', () => {
      assert.deepEqual(
        gen.next().done,
        true
      );
    });
  });

  describe('searchAsync()', () => {
    const action = {
      type: SEARCH,
      searchPhrase: 'test search'
    };
    const data = {};
    data.gen = cloneableGenerator(searchAsync)(action);

    it('should call fetchImages() with searchPrase', () => {
      assert.deepEqual(
        data.gen.next().value,
        call(fetchImages, { searchPhrase: 'test search' })
      );
    });


    describe('when api works fine', () => {
      const successfulResponse = {
        response: {
          images: [
            {
              id: 'zzfw',
              width: 20,
              height: 20,
              url: 'http://example.com/zzz.jpg',
              thumbUrl: 'http://example.com/zzzs.jpg',
            },
          ],
        },
      };

      it('should dispatch searchSucceeded() action', () => {
        data.clone = data.gen.clone();
        assert.deepEqual(
          data.gen.next(successfulResponse).value,
          put(searchSucceeded(successfulResponse.response.images))
        );
      });

      it('should be done', () => {
        assert.deepEqual(
          data.gen.next().done,
          true
        );
      });
    });

    describe('when api throw an error', () => {
      const errorResponse = { error: {} };

      it('should dispatch searchFailed() action', () => {
        assert.deepEqual(
          data.clone.next(errorResponse).value,
          put(searchFailed(errorResponse.error))
        );
      })

      it('should be done', () => {
        assert.deepEqual(
          data.clone.next().done,
          true
        );
      });
    });
  });
});