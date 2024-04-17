import PropTypes from 'prop-types';

const SeoContentShape = PropTypes.shape({
  id: PropTypes.number,
  domain: PropTypes.string,
  urlPattern: PropTypes.string,
  pageType: PropTypes.string,
  canonicalUrl: PropTypes.string,
  translations: PropTypes.object,
  data: PropTypes.object,
});

export default SeoContentShape;
