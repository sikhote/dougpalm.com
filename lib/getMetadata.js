export default function getMetadata(page, params) {
  const divider = ' · ';
  const name = 'Doug Palm';
  let description = `Personal website of ${name}`;
  let title = description;

  switch (page) {
    case 'pages':
      if (params.id) {
        const pageLower = params.id.split('-').join(' ');
        const page = pageLower.charAt(0).toUpperCase() + pageLower.slice(1);
        title = `${page}${divider}${name}`;
      }
      break;
  }

  return { title, description };
}
