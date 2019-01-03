import he from 'he';
import showdown from 'showdown';

export const converter = new showdown.Converter();

export const getH1 = html => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  const decodedStrippedHtml = he.decode(strippedHtml);
  return decodedStrippedHtml.split('\n')[0];
};
