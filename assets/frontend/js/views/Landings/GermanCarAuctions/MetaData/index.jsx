/* eslint-disable react/prop-types */
import React from 'react';
import ReactMetaTags from 'react-meta-tags';
import useIntl from 'frontend/js/hooks/useIntl';

function MetaData() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'germanCarAuctionsPage.meta.title' });
  const description = intl.formatMessage({ id: 'germanCarAuctionsPage.meta.subtitle' });

  return (
    <ReactMetaTags>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </ReactMetaTags>
  );
}

export default MetaData;
