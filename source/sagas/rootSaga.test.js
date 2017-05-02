import { describe, it } from 'mocha';
import assert from 'assert';
import { call, put, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import {
  fetchGalleries,
  fetchGalleryComments,
  fetchGalleryAlbumImages,
} from '../api';
import {
  GET_GALLERIES,
  SEARCH,
  getGalleriesSucceeded,
  getGalleriesFailed,
  searchSucceeded,
  searchFailed,
} from '../actions';
import {
  watchGetGalleries,
  watchSearch,
  getGalleriesAsync,
  searchAsync,
} from './rootSaga';

describe('sagas/rootSaga', () => {
  describe('watchGetGalleries()', () => {
    const gen = watchGetGalleries();

    it('should takeEvery GET_GALLERIES actions and call getGalleriesAsync()', () => {
      assert.deepEqual(
        gen.next().value,
        takeEvery(GET_GALLERIES, getGalleriesAsync)
      );
    });

    it('should be done', () => {
      assert.deepEqual(
        gen.next().done,
        true
      );
    });
  });

  describe('getGalleriesAsync()', () => {
    const data = {};
    data.gen = cloneableGenerator(getGalleriesAsync)();

    it('should call fetchGalleries()', () => {
      assert.deepEqual(
        data.gen.next().value,
        call(fetchGalleries)
      );
    });


    describe('when api works fine', () => {
      const successfulResponse = {
        response: {
          galleries: [
            {
              id: 'zzfw',
              isAlbum: true,
              coverId: 'zzz',
              coverWidth: 20,
              coverHeight: 20,
              coverUrl: 'http://example.com/zzz.jpg',
              coverThumbUrl: 'http://example.com/zzzs.jpg',
            },
          ],
        },
      };

      it('should dispatch getGalleriesSucceeded() action', () => {
        data.clone = data.gen.clone();
        assert.deepEqual(
          data.gen.next(successfulResponse).value,
          put(getGalleriesSucceeded(successfulResponse.response.galleries))
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

      it('should dispatch getGalleriesFailed() action', () => {
        assert.deepEqual(
          data.clone.next(errorResponse).value,
          put(getGalleriesFailed(errorResponse.error))
        );
      });

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
      searchPhrase: 'test search',
    };
    const data = {};
    data.gen = cloneableGenerator(searchAsync)(action);

    it('should call fetchGalleries() with searchPrase', () => {
      assert.deepEqual(
        data.gen.next().value,
        call(fetchGalleries, { searchPhrase: 'test search' })
      );
    });


    describe('when api works fine', () => {
      const successfulResponse = {
        response: {
          galleries: [
            {
              id: 'zzfw',
              isAlbum: false,
              coverId: 'zzz',
              coverWidth: 200,
              coverHeight: 300,
              coverUrl: 'http://example.com/zzz.jpg',
              coverThumbUrl: 'http://example.com/zzzs.jpg',
            },
          ],
        },
      };

      it('should dispatch searchSucceeded() action', () => {
        data.clone = data.gen.clone();
        assert.deepEqual(
          data.gen.next(successfulResponse).value,
          put(searchSucceeded(successfulResponse.response.galleries))
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
      });

      it('should be done', () => {
        assert.deepEqual(
          data.clone.next().done,
          true
        );
      });
    });
  });
});
