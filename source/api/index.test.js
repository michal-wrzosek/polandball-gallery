import { describe, it, afterEach } from 'mocha';
import assert from 'assert';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  apiUrl,
  fetchImages,
} from './index';

describe('api/', () => {
  const mock = new MockAdapter(axios);
  
  afterEach(() => {
    mock.reset();
  });

  describe('fetchImages()', () => {
    const successfulResponse = {
      data: [
        {
          id: 'albumid',
          cover: 'coverid1',
          cover_width: 200,
          cover_height: 300,
          is_album: true,
        },
        {
          id: 'imageid1',
          width: 400,
          height: 500,
          is_album: false,
        },
      ],
    };

    const successfulReturn = {
      response: {
        images: [
          {
            id: 'coverid1',
            width: 200,
            height: 300,
            url: 'http://i.imgur.com/coverid1.jpg',
            thumbUrl: 'http://i.imgur.com/coverid1b.jpg',
          },
          {
            id: 'imageid1',
            width: 400,
            height: 500,
            url: 'http://i.imgur.com/imageid1.jpg',
            thumbUrl: 'http://i.imgur.com/imageid1b.jpg',
          },
        ],
      },
    };

    it('should work with no options given', () => {
      mock
        .onGet(`${apiUrl}gallery/search/?q_all=polandball&page=0`)
        .reply(200, successfulResponse);

      return fetchImages()
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });

    it('should work with page option given', () => {
      mock
        .onGet(`${apiUrl}gallery/search/?q_all=polandball&page=13`)
        .reply(200, successfulResponse);

      return fetchImages({ page: 13 })
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });

    it('should work with search phrase given', () => {
      mock
        .onGet(`${apiUrl}gallery/search/?q_all=polandball+test+phrase&page=0`)
        .reply(200, successfulResponse);

      return fetchImages({ searchPhrase: 'test phrase' })
        .then(response => {
          assert.deepEqual(
            response,
            successfulReturn
          );
        });
    });
  });
});