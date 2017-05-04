import { describe, it } from 'mocha';
import { Map } from 'immutable';
import assert from 'assert';
import {
  all,
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
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
  GALLERY_OPENED,
  SEARCH,
  getGalleriesSucceeded,
  getGalleriesFailed,
  searchSucceeded,
  searchFailed,
  galleryOpened,
  homepageOpened,
  getGalleryComments,
  getGalleryCommentsSucceeded,
  getGalleryCommentsFailed,
  getGalleryAlbumImages,
  getGalleryAlbumImagesSucceeded,
  getGalleryAlbumImagesFailed,
} from '../actions';
import { getGallery } from '../selectors';
import rootSaga, {
  watchGetGalleries,
  watchSearch,
  watchLocationChange,
  watchGalleryOpened,
  getGalleriesAsync,
  searchAsync,
  logLocation,
  getGalleryCommentsAsync,
  getGalleryAlbumImagesAsync,
  redirectIfGalleryNotExists,
} from './rootSaga';

describe('sagas/rootSaga', () => {
  describe('rootSaga()', () => {
    const gen = rootSaga();
    it('should run all watchers', () => {
      assert.deepEqual(
        gen.next().value,
        all([
          call(watchGetGalleries),
          call(watchSearch),
          call(watchLocationChange),
          call(watchGalleryOpened),
        ])
      );
    });

    it('should be done', () => {
      assert.deepEqual(
        gen.next().done,
        true
      );
    });
  });

  describe('watchers', () => {
    describe('watchGetGalleries()', () => {
      const gen = watchGetGalleries();

      it('should takeLatest GET_GALLERIES actions and call getGalleriesAsync()', () => {
        assert.deepEqual(
          gen.next().value,
          takeLatest(GET_GALLERIES, getGalleriesAsync)
        );
      });

      it('should be done', () => {
        assert.deepEqual(
          gen.next().done,
          true
        );
      });
    });

    describe('watchSearch()', () => {
      const gen = watchSearch();

      it('should takeLatest SEARCH actions and call searchAsync()', () => {
        assert.deepEqual(
          gen.next().value,
          takeLatest(SEARCH, searchAsync)
        );
      });

      it('should be done', () => {
        assert.deepEqual(
          gen.next().done,
          true
        );
      });
    });

    describe('watchLocationChange()', () => {
      const gen = watchLocationChange();

      it('should takeLatest LOCATION_CHANGE and call logLocation()', () => {
        assert.deepEqual(
          gen.next().value,
          takeLatest(LOCATION_CHANGE, logLocation)
        );
      });

      it('should be done', () => {
        assert.deepEqual(
          gen.next().done,
          true
        );
      });
    });

    describe('watchGalleryOpened()', () => {
      const gen = watchGalleryOpened();

      it('should watch GALLERY_OPENED and call redirectIfGalleryNotExists()',
        () => {
          assert.deepEqual(
            gen.next().value,
            takeLatest(GALLERY_OPENED, redirectIfGalleryNotExists)
          );
        }
      );

      it('should watch GALLERY_OPENED and call getGalleryCommentsAsync()',
        () => {
          assert.deepEqual(
            gen.next().value,
            takeLatest(GALLERY_OPENED, getGalleryCommentsAsync)
          );
        }
      );

      it('should watch GALLERY_OPENED and call getGalleryAlbumImagesAsync()',
        () => {
          assert.deepEqual(
            gen.next().value,
            takeLatest(GALLERY_OPENED, getGalleryAlbumImagesAsync)
          );
        }
      );

      it('should be done', () => {
        assert.deepEqual(
          gen.next().done,
          true,
        );
      });
    });
  });

  describe('workers', () => {
    describe('getGalleriesAsync()', () => {
      const data = {};
      const action = {
        type: GET_GALLERIES,
        searchPhrase: '',
        page: 0,
      };
      data.gen = cloneableGenerator(getGalleriesAsync)(action);

      it('should call fetchGalleries()', () => {
        assert.deepEqual(
          data.gen.next().value,
          call(fetchGalleries, {
            searchPhrase: '',
            page: 0,
          })
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

    describe('logLocation()', () => {
      describe('when opened gallery', () => {
        const action = {
          type: LOCATION_CHANGE,
          payload: { pathname: '/galleries/zzsda' },
        };
        const gen = logLocation(action);

        it('should dispatch galleryOpened action', () => {
          assert.deepEqual(
            gen.next().value,
            put(galleryOpened('zzsda'))
          );
        });

        it('should be done', () => {
          assert.deepEqual(
            gen.next().done,
            true
          );
        });
      });

      describe('when opened homepage', () => {
        const action = {
          type: LOCATION_CHANGE,
          payload: { pathname: '/' },
        };
        const gen = logLocation(action);

        it('should dispatch homepageOpened action', () => {
          assert.deepEqual(
            gen.next().value,
            put(homepageOpened())
          );
        });

        it('should be done', () => {
          assert.deepEqual(
            gen.next().done,
            true
          );
        });
      });
    });

    describe('redirectIfGalleryNotExists()', () => {
      const action = {
        id: 'asasd',
      };
      const data = {};
      data.gen = cloneableGenerator(redirectIfGalleryNotExists)(action);

      it('should select gallery from store', () => {
        assert.deepEqual(
          data.gen.next().value,
          select(getGallery, 'asasd')
        );
        data.clone = data.gen.clone();
      });

      describe('when gallery exists', () => {
        it('should be done', () => {
          assert.deepEqual(
            data.gen.next(Map()).done,
            true
          );
        });
      });

      describe("when gallery don't exists", () => {
        it('should dispatch push action to open homepage', () => {
          assert.deepEqual(
            data.clone.next(false).value,
            put(push('/'))
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

    describe('getGalleryCommentsAsync()', () => {
      const action = { id: 'sdfas' };
      const data = {};
      data.gen = cloneableGenerator(getGalleryCommentsAsync)(action);

      it('should select gallery', () => {
        assert.deepEqual(
          data.gen.next().value,
          select(getGallery, 'sdfas')
        );
        data.noGallery = data.gen.clone();
      });

      describe('when gallery exists', () => {
        
        it('should dispatch getGalleryComments()', () => {
          assert.deepEqual(
            data.gen.next(Map({ isAlbum: true })).value,
            put(getGalleryComments('sdfas'))
          );
        });

        it('should call fetchGalleryComments()', () => {
          assert.deepEqual(
            data.gen.next({}).value,
            call(fetchGalleryComments, 'sdfas', true)
          );
          data.clone = data.gen.clone();
        });
        describe('when succeeded', () => {
          it('should dispatch getGalleryCommentsSucceeded()', () => {
            const successfulResponse = { response: { comments: [] } };
            assert.deepEqual(
              data.gen.next(successfulResponse).value,
              put(getGalleryCommentsSucceeded('sdfas', []))
            );
          });

          it('should be done', () => {
            assert.deepEqual(
              data.gen.next().done,
              true
            );
          });
        });

        describe('when failed', () => {
          it('should dispatch getGalleryCommentsFailed()', () => {
            const failResponse = { error: 'ERROR!' };
            assert.deepEqual(
              data.clone.next(failResponse).value,
              put(getGalleryCommentsFailed('sdfas', 'ERROR!'))
            );
          });

          it('should be done', () => {
            assert.deepEqual(
              data.clone.next().done,
              true
            );
          });
        })
      });

      describe("when gallery don't exisits", () => {
        it('should be done', () => {
          assert.deepEqual(
            data.noGallery.next(false).done,
            true
          );
        });
      });
    });

    describe('getGalleryAlbumImagesAsync()', () => {
      const action = { id: 'sdfas' };
      const data = {};
      data.gen = cloneableGenerator(getGalleryAlbumImagesAsync)(action);

      it('should select gallery', () => {
        assert.deepEqual(
          data.gen.next().value,
          select(getGallery, 'sdfas')
        );
        data.noGallery = data.gen.clone();
        data.notAnAlbum = data.gen.clone();
      });

      describe('when gallery exists and is an album', () => {
        
        it('should dispatch getGalleryAlbumImages()', () => {
          assert.deepEqual(
            data.gen.next(Map({ isAlbum: true })).value,
            put(getGalleryAlbumImages('sdfas'))
          );
        });

        it('should call fetchGalleryAlbumImages()', () => {
          assert.deepEqual(
            data.gen.next({}).value,
            call(fetchGalleryAlbumImages, 'sdfas')
          );
          data.apiFail = data.gen.clone();
        });
        describe('when succeeded', () => {
          it('should dispatch getGalleryAlbumImagesSucceeded()', () => {
            const successfulResponse = { response: { images: [] } };
            assert.deepEqual(
              data.gen.next(successfulResponse).value,
              put(getGalleryAlbumImagesSucceeded('sdfas', []))
            );
          });

          it('should be done', () => {
            assert.deepEqual(
              data.gen.next().done,
              true
            );
          });
        });

        describe('when failed', () => {
          it('should dispatch getGalleryAlbumImagesFailed()', () => {
            const failResponse = { error: 'ERROR!' };
            assert.deepEqual(
              data.apiFail.next(failResponse).value,
              put(getGalleryAlbumImagesFailed('sdfas', 'ERROR!'))
            );
          });

          it('should be done', () => {
            assert.deepEqual(
              data.apiFail.next().done,
              true
            );
          });
        })
      });

      describe("when gallery exists but not an album", () => {
        it('should be done', () => {
          assert.deepEqual(
            data.notAnAlbum.next(Map({ isAlbum: false })).done,
            true
          );
        });
      });

      describe("when gallery don't exisits", () => {
        it('should be done', () => {
          assert.deepEqual(
            data.noGallery.next(false).done,
            true
          );
        });
      });
    });
  });
});
