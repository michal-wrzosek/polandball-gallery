const imageUrl = '';

const generateImageUrl = (id, ver = '') => `http://i.imgur.com/${id}${ver}.jpg`;

const createImage = ({ id, width, height, url }) => ({
  id,
  width,
  height,
  url: generateImageUrl(id),
  thumbUrl: generateImageUrl(id, 'b'),
});

const parseTagItemImage = image => createImage({
  id: image.id,
  width: image.width,
  height: image.height,
});

const parseGalleryAlbum = galleryAlbum => createImage({
  id: galleryAlbum.cover,
  width: galleryAlbum.cover_width,
  height: galleryAlbum.cover_height,
});

export const parseTagResponse = tag => tag.data.items.map((item) => {
  return item.is_album ? parseGalleryAlbum(item) : parseTagItemImage(item);
});