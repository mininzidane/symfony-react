import PropTypes from 'prop-types';
import SeoContentShape from './SeoContentShape';

const DynamicPageShape = PropTypes.shape({
  id: PropTypes.number,
  url: PropTypes.string,
  domain: PropTypes.string,
  active: PropTypes.bool,
  seo: SeoContentShape,
  translations: PropTypes.object,
});

export default DynamicPageShape;
