import React from 'react';
import PropTypes from 'prop-types';
import { RawIntlProvider } from 'react-intl';
import intl from './intl';

function TranslationProvider({ children }) {
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
}

TranslationProvider.defaultProps = {
  children: null,
};

TranslationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default TranslationProvider;
