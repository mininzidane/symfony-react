import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash/escapeRegExp';
import useStyles from './useStyles';

function HighlightMatch({ value, match, className, highlight, component: Component }) {
  const classes = useStyles();

  function highlightMatch(text) {
    if (!match || !text) {
      return text;
    }

    const regExp = new RegExp(`(${escapeRegExp(match)})`, 'gi');
    return text.replace(regExp, `<span class=${highlight || classes.highlighted}>$1</span>`);
  }

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{
        __html: highlightMatch(value),
      }}
    />
  );
}

HighlightMatch.propTypes = {
  value: PropTypes.string,
  match: PropTypes.string,
  className: PropTypes.string,
  highlight: PropTypes.string,
  component: PropTypes.elementType,
};

HighlightMatch.defaultProps = {
  value: '',
  match: '',
  className: '',
  highlight: '',
  component: 'span',
};

export default HighlightMatch;
