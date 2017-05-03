import axios from 'axios';

export const apiUrl = 'https://api.imgur.com/3/';
const clientId = '7b1f7a9c25b701b';

axios.defaults.headers.common.Authorization = `Client-ID ${ clientId }`;

const generateImageUrl = (id, ver = '') =>
  `http://i.imgur.com/${ id }${ ver }.jpg`;

const createGallery = ({
  id,
  isAlbum,
  coverId,
  coverWidth,
  coverHeight,
}) => ({
  id,
  isAlbum,
  coverId,
  coverWidth,
  coverHeight,
  coverUrl: generateImageUrl(coverId),
  coverThumbUrl: generateImageUrl(coverId, 'b'),
});

const createComment = ({
  id,
  author,
  authorId,
  comment,
  children,
}) => ({
  id,
  author,
  authorId,
  comment,
  children: children.length > 0 ? parseFetchGalleryComments(children) : [],
});

const createImage = ({
  id,
  width,
  height,
}) => ({
  id,
  width,
  height,
  url: generateImageUrl(id),
  urlThumb: generateImageUrl(id, 'b'),
});

const parseGalleryImage = gallery => createGallery({
  id: gallery.id,
  isAlbum: false,
  coverId: gallery.id,
  coverWidth: gallery.width,
  coverHeight: gallery.height,
});

const parseGalleryAlbum = gallery => createGallery({
  id: gallery.id,
  isAlbum: true,
  coverId: gallery.cover,
  coverWidth: gallery.cover_width,
  coverHeight: gallery.cover_height,
});

const parseComment = comment => createComment({
  id: comment.id,
  author: comment.author,
  authorId: comment.author_id,
  comment: comment.comment,
  children: comment.children,
});

const parseImage = image => createImage({
  id: image.id,
  width: image.width,
  height: image.height,
});

const parseFetchGalleriesResponse = galleries => galleries
  .map(i => (i.is_album ? parseGalleryAlbum(i) : parseGalleryImage(i)));

const parseFetchGalleryComments = comments => comments
  .map(comment => createComment(parseComment(comment)));

const parseFetchGalleryAlbumImages = galleryAlbum => galleryAlbum
  .images.map(image => parseImage(image));

const createSearchQuery = (searchPhrase) => {
  return [
    'polandball',
    ...(searchPhrase.match(/\S+/g) || []),
  ].join('+');
};

export const fetchGalleries = ({ searchPhrase = '', page = 0 } = {}) => {
  const query = createSearchQuery(searchPhrase);
  return axios
    .get(`${ apiUrl }gallery/search/?q_all=${ query }&page=${ page }`)
    .then(response => response.data.data)
    .then(galleries => parseFetchGalleriesResponse(galleries))
    .then(galleries => ({ response: { galleries } }))
    .catch(error => ({ error }));
};

export const fetchGalleryComments = (id, isAlbum) => {
  return axios
    .get(`${ apiUrl }${ isAlbum ? 'gallery' : 'image' }/${ id }/comments`)
    .then(response => response.data.data)
    .then(comments => parseFetchGalleryComments(comments))
    .then(comments => ({ response: { comments } }))
    .catch(error => ({ error }));
};

export const fetchGalleryAlbumImages = id => {
  return axios
    .get(`${ apiUrl }gallery/${ id }`)
    .then(response => response.data.data)
    .then(galleryAlbum => parseFetchGalleryAlbumImages(galleryAlbum))
    .then(images => ({ response: { images } }))
    .catch(error => ({ error }));
};
