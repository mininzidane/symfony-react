/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import HighlightMatch from 'frontend/js/components/HighlightMatch';
import useStyles from './useStyles';

function Suggestions({ suggestions, query, onClick, isOpen }) {
  const classes = useStyles();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={classes.root}>
      {suggestions.map((suggestion) => (
        <button
          type="button"
          className={classnames(classes.button, 'suggestion')}
          onClick={() => onClick(suggestion)}
          key={suggestion}
        >
          <HighlightMatch className={classes.suggestion} value={suggestion} match={query} highlight="fw-7" />
        </button>
      ))}
    </div>
  );
}

export default Suggestions;
