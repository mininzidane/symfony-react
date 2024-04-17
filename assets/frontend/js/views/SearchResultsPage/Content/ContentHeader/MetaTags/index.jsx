import React from 'react';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import ReactMetaTags from 'react-meta-tags';

function MetaTags() {
  const [{ seo }] = useSearchData();

  const { title, description, keywords, noIndex, follow, canonicalUrl } = seo;

  return (
    <ReactMetaTags>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {noIndex && <meta name="robots" content={follow ? 'noindex follow' : 'noindex'} />}
      {canonicalUrl && <link href={canonicalUrl} rel="canonical" />}
    </ReactMetaTags>
  );
}

export default MetaTags;
