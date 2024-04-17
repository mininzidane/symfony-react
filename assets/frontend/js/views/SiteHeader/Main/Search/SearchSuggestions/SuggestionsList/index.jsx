/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import t from 'frontend/js/api/TranslatorService';
import SearchIconSvg from 'frontend/images/shared/various/search-icon-black.svg';
import HighlightMatch from 'frontend/js/components/HighlightMatch';

function SuggestionsList({ suggestions, focusedHintIndex, handleSuggestionClick, searchQuery, classes }) {
  if (!suggestions.length) {
    return null;
  }

  return (
    <>
      <div className={classes.suggestionCaption}>{t('header.search.suggested')}</div>

      {suggestions.map((suggestion, index) => (
        <div
          className={classNames(classes.suggestion, 'is-search-option', {
            'is-selected': index === focusedHintIndex,
          })}
          onMouseDown={() => handleSuggestionClick(suggestion)}
          role="button"
          tabIndex={0}
          key={suggestion}
        >
          <div className="d-f jc-sb ai-ct">
            <div className={classes.suggestionText}>
              <img src={SearchIconSvg} width={14} height={14} className={classes.suggestionIcon} alt="clock" />
              <HighlightMatch value={suggestion} match={searchQuery} highlight={classes.suggestionHighlight} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SuggestionsList;
