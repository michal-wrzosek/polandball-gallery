import { describe, it, afterEach } from 'mocha';
import {
  expect,
  assert,
} from 'chai';
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

    it('should handle error correctly', () => {
      mock
        .onGet(`${ apiUrl }gallery/search/?q_all=polandball&page=0`)
        .reply(500, {});

      return fetchGalleries()
        .then(error => {
          expect(error).to.contain.all.keys(['error']);
        });
    });
  });

  describe('fetchGalleryComments()', () => {
    const apiResponse = {
      data: [
        {
          id: 'ssda',
          author: 'Author Name',
          author_id: 'sslsa',
          comment: 'This is comment text',
          something_else: 'idk?',
          children: [
            {
              id: 'asas',
              author: 'Author Name 2',
              author_id: 'fdfd',
              comment: 'This is another comment text',
              something_else: 'idk?',
              children: [],
            },
            {
              id: 'ghfg',
              author: 'Author Name 3',
              author_id: 'fgtt',
              comment: 'This is just a comment text',
              something_else: 'idk?',
              children: [],
            },
          ],
        },
      ],
    };

    const funcReturn = {
      response: {
        comments: [
          {
            id: 'ssda',
            author: 'Author Name',
            authorId: 'sslsa',
            comment: 'This is comment text',
            children: [
              {
                id: 'asas',
                author: 'Author Name 2',
                authorId: 'fdfd',
                comment: 'This is another comment text',
                children: [],
              },
              {
                id: 'ghfg',
                author: 'Author Name 3',
                authorId: 'fgtt',
                comment: 'This is just a comment text',
                children: [],
              },
            ],
          },
        ],
      },
    };

    it('should get comments for gallery album', () => {
      mock
        .onGet(`${ apiUrl }gallery/sadds/comments`)
        .reply(200, apiResponse);

      return fetchGalleryComments('sadds', true)
        .then(response => {
          assert.deepEqual(
            response,
            funcReturn
          );
        });
    });

    it('should get comments for gallery image', () => {
      mock
        .onGet(`${ apiUrl }image/sadds/comments`)
        .reply(200, apiResponse);

      return fetchGalleryComments('sadds', false)
        .then(response => {
          assert.deepEqual(
            response,
            funcReturn
          );
        });
    });

    it('should handle error correctly', () => {
      mock
        .onGet(`${ apiUrl }image/sadds/comments`)
        .reply(500, {});

      return fetchGalleryComments('sadds', false)
        .then(error => {
          expect(error).to.contain.all.keys(['error']);
        });
    });
  });

  describe('fetchGalleryAlbumImages()', () => {
    const apiResponse = {
      data: {
        something: 'llsda',
        images: [
          {
            id: 'sddsa',
            width: 300,
            height: 400,
            key: 'value',
          },
          {
            id: 'shggv',
            width: 100,
            height: 200,
            key3: 'value2',
          },
        ],
      },
    };

    const funcReturn = {
      response: {
        images: [
          {
            id: 'sddsa',
            width: 300,
            height: 400,
            url: 'http://i.imgur.com/sddsa.jpg',
            thumbUrl: 'http://i.imgur.com/sddsab.jpg',
          },
          {
            id: 'shggv',
            width: 100,
            height: 200,
            url: 'http://i.imgur.com/shggv.jpg',
            thumbUrl: 'http://i.imgur.com/shggvb.jpg',
          },
        ],
      },
    };

    it('should get images properly', () => {
      mock
        .onGet(`${ apiUrl }gallery/fgcvc`)
        .reply(200, apiResponse)

      return fetchGalleryAlbumImages('fgcvc')
        .then(response => {
          expect(response).to.be.deep.equal(funcReturn);
        });
    });

    it('should handle error properly', () => {
      mock
        .onGet(`${ apiUrl }gallery/fgcvc`)
        .reply(500, {})

      return fetchGalleryAlbumImages('fgcvc')
        .then(error => {
          expect(error).to.contain.all.keys(['error']);
        });
    });
  });
});
