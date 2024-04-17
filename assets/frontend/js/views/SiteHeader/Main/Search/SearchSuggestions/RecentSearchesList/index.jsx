/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import t from 'frontend/js/api/TranslatorService';
import ClockSvg from 'frontend/js/views/SiteHeader/Main/Search/SearchSuggestions/img/clock.svg';
import ButtonText from 'frontend/js/components/ButtonText';

function RecentSearchesList({
  classes,
  recentSearches,
  focusedHintIndex,
  handleSuggestionClick,
  deleteSearch,
  lockDropdown,
}) {
  if (!recentSearches.length) {
    return null;
  }

  return (
    <>
      <div className={classes.suggestionCaption}>{t('header.search.search_history')}</div>

      {recentSearches.map((recentSearch, index) => (
        <div
          key={recentSearch}
          className={classNames(classes.suggestion, 'is-search-option', 'is-recent-search', {
            'is-selected': index === focusedHintIndex,
          })}
          data-option="true"
        >
          <div className={classes.recentSearchWrap}>
            <div
              className={classes.recentSearchesText}
              onMouseDown={() => handleSuggestionClick(recentSearch)}
              role="button"
              tabIndex={0}
            >
              <img src={ClockSvg} width={14} height={14} className={classes.recentSearchIcon} alt="clock" />
              {recentSearch}
            </div>

            <ButtonText
              className={classes.suggestionDelete}
              onMouseDown={() => {
                deleteSearch(recentSearch);
                lockDropdown();
              }}
              label={t('header.search.delete')}
              size="sm"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default RecentSearchesList;
