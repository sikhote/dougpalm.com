import he from 'he';
import showdown from 'showdown';

export const contentBase = 'https://dougpalm.com/content';

const showdownConverter = new showdown.Converter();

export const converter = {
  ...showdownConverter,
  makeHtml: raw =>
    showdownConverter.makeHtml(raw.replace(/\/content/g, contentBase)),
};

export const getH1 = html => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  const decodedStrippedHtml = he.decode(strippedHtml);
  return decodedStrippedHtml.split('\n')[0];
};
