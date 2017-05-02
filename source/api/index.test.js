import { describe, it, afterEach } from 'mocha';
import assert from 'assert';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  apiUrl,
  fetchGalleries,
  fetchGalleryComments,
  fetchGalleryAlbumImages,
} from './index';

describe('api/', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('fetchGalleries()', () => {
    const successfulResponse = {
      data: [
        {
          id: 'albumid',
          cover: 'coverid1',
          cover_width: 200,
          cover_height: 300,
          is_album: true,
          something: 'idk',
        },
        {
          id: 'imageid1',
          width: 400,
          height: 500,
          is_album: false,
          xxx: '?',
        },
      ],
    };

    const successfulReturn = {
      response: {
        galleries: [
          {
            id: 'albumid',
            isAlbum: true,
            coverId: 'coverid1',
            coverWidth: 200,
            coverHeight: 300,
            coverUrl: 'http://i.imgur.com/coverid1.jpg',
            coverThumbUrl: 'http://i.imgur.com/coverid1b.jpg',
          },
          {
            id: 'imageid1',
            isAlbum: false,
            coverId: 'imageid1',
            coverWidth: 400,
            coverHeight: 500,
            coverUrl: 'http://i.imgur.com/imageid1.jpg',
            coverThumbUrl: 'http://i.imgur.com/imageid1b.jpg',
          },
        ],
      },
    };

    it('should work with no options given', () => {
      mock
        .onGet(`${ apiUrl }gallery/search/?q_all=polandball&page=0`)
        .reply(200, successfulResponse);

      return fetchGalleries()
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });

    it('should work with page option given', () => {
      mock
        .onGet(`${ apiUrl }gallery/search/?q_all=polandball&page=13`)
        .reply(200, successfulResponse);

      return fetchGalleries({ page: 13 })
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });

    it('should work with search phrase given', () => {
      mock
        .onGet(`${ apiUrl }gallery/search/?q_all=polandball+test+phrase&page=0`)
        .reply(200, successfulResponse);

      return fetchGalleries({ searchPhrase: 'test phrase' })
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });
  });

  describe('fetchGalleryComments()', () => {
    it('should get comments for gallery album');
    it('should get comments for gallery image');
  });

  describe('fetchGalleryAlbumImages()', () => {
    it('should get images properly');
  });
});
