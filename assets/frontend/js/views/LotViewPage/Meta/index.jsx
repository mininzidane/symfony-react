import React from 'react';
import PropTypes from 'prop-types';
import ReactMetaTags from 'react-meta-tags';
import get from 'lodash/get';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function Meta({ lot, seo }) {
  if (!lot || lot.FAKE || !seo) {
    return null;
  }

  const { largeImage, saleStartAt } = lot;
  const metaTitle = get(seo, 'title');
  const metaDescription = get(seo, 'description');
  const metaKeywords = get(seo, 'keywords');

  return (
    <ReactMetaTags>
      <title>{metaTitle}</title>
      <meta name="og:title" content={metaTitle} />
      <meta name="twitter:title" content={metaTitle} />

      <meta name="description" content={metaDescription} />
      <meta name="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />

      {metaKeywords ? <meta name="keywords" content={metaKeywords} /> : null}

      {largeImage && (
        <>
          <meta property="og:image" content={largeImage} />
          <meta name="twitter:type" content="summary_large_image" />
          <meta name="twitter:image" content={largeImage} />
        </>
      )}

      {saleStartAt && (
        <meta
          name="product:expiration_time"
          content={DateTimeService.formatFromISOString(saleStartAt, 'MM/dd/yyyy h:mmaaa')}
        />
      )}

      <meta name="og:type" content="product" />
    </ReactMetaTags>
  );
}

Meta.propTypes = {
  lot: LotShape.isRequired,
  seo: PropTypes.object,
};

Meta.defaultProps = {
  seo: undefined,
};

export default Meta;
