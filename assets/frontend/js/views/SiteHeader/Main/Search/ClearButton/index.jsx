/* eslint-disable react/prop-types */
import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import CrossSvg from 'frontend/images/shared/various/cross-thin-10x10.svg';
import useStyles from './useStyles';

function ClearButton({ searchQuery, clearButtonRef, inputRef, setSearchQuery }) {
  const classes = useStyles();

  function handleClick() {
    setSearchQuery('');
    inputRef.current.focus();
  }

  return (
    <button
      type="button"
      className={classes.root}
      aria-label={t('header.search.clear_search')}
      ref={clearButtonRef}
      style={{ visibility: searchQuery ? 'visible' : 'hidden' }}
      onClick={handleClick}
    >
      <img src={CrossSvg} width="14" height="14" alt={t('header.search.clear_search')} />
    </button>
  );
}

export default ClearButton;
