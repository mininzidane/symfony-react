import PropTypes from 'prop-types';

const SeoShape = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  pageTitle: PropTypes.string,
  pageContent: PropTypes.string,
  noIndex: PropTypes.bool,
  follow: PropTypes.bool,
  canonicalUrl: PropTypes.string,
});

export default SeoShape;
