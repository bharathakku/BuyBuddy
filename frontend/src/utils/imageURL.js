export const getFullImageUrl = (url) => {
  if (!url) return '';
  return url.startsWith('http')
    ? url
    : `https://res.cloudinary.com/dk0pof90y/image/upload/${url}`;
};
