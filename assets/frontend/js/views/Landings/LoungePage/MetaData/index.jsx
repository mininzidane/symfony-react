/* eslint-disable react/prop-types */
import React from 'react';
import ReactMetaTags from 'react-meta-tags';
import useIntl from 'frontend/js/hooks/useIntl';

function MetaData({ iso2 }) {
  const intl = useIntl();
  const title = intl.formatMessage({ id: `loungePage.meta.${iso2}.title` });
  const description = intl.formatMessage({ id: `loungePage.meta.${iso2}.desc` });

  return (
    <ReactMetaTags>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </ReactMetaTags>
  );
}

export default MetaData;
