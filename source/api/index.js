import axios from 'axios';

const imageUrl = '';
const apiUrl = 'https://api.imgur.com/3/';
const clientId = '7b1f7a9c25b701b';

axios.defaults.headers.common['Authorization'] = `Client-ID ${clientId}`;

const generateImageUrl = (id, ver = '') => `http://i.imgur.com/${id}${ver}.jpg`;

const createImage = ({ id, width, height, url }) => ({
  id,
  width,
  height,
  url: generateImageUrl(id),
  thumbUrl: generateImageUrl(id, 'b'),
});

const parseImage = image => createImage({
  id: image.id,
  width: image.width,
  height: image.height,
});

const parseGalleryAlbum = galleryAlbum => createImage({
  id: galleryAlbum.cover,
  width: galleryAlbum.cover_width,
  height: galleryAlbum.cover_height,
});

const parseFetchImagesResponse = search => search.data.map((item) => {
  return item.is_album ? parseGalleryAlbum(item) : parseImage(item);
})

export const fetchImages = ({ searchPhrase = '', page = 0 }) => {
  const query = ['polandball', ...searchPhrase.match(/\S+/g)].join('+');
  return axios
    .get(`${apiUrl}gallery/search/?q_all=${query}page=${page}`)
    .then(response => response.data)
    .then(data => parseFetchImagesResponse(data));
};