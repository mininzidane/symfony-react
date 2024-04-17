/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import LotService from 'frontend/js/api/LotService';
import { isOnPage } from 'frontend/js/router/utils';
import SPA_CONFIG from 'frontend/js/router/config';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useLockDropdown from './useLockDropdown';
import useFocusedHintIndex from './useFocusedHintIndex';
import usePopularSearches from './usePopularSearches';
import useRecentSearches from './useRecentSearches';
import useSuggestions from './useSuggestions';
import useSuggestionsMaxHeight from './useMaxHeight';
import useStyles from './useStyles';
import PopularSearches from './PopularSearches';
import RecentSearchesList from './RecentSearchesList';
import SuggestionsList from './SuggestionsList';

function SearchSuggestions({
  clearButtonRef,
  submitButtonRef,
  inputRef,
  formRef,
  searchQuery,
  setSearchQuery,
  setInputFocused,
  marketKey,
  setHasHints,
  isInputFocused,
  params,
  trimmedQuery,
}) {
  const classes = useStyles();
  const suggestionsMenuMaxHeight = useSuggestionsMaxHeight();
  const [isSearchQueryFromHint, setIsSearchQueryFromHint] = useState(false);

  const hintsOptions = { searchQuery, marketKey, listSize: 5 };
  const { isHintsDropdownLocked, temporaryLockHintsDropdown, hintsDropdownLockTimeout } = useLockDropdown();
  const { focusedHintIndex, resetFocusedHintIndex, updateFocusedHintIndex } = useFocusedHintIndex();
  const { popularSearches } = usePopularSearches(marketKey);
  const { recentSearches, addSearch, deleteSearch } = useRecentSearches(hintsOptions);
  const { suggestions, clearSuggestions, updateSuggestions } = useSuggestions(
    hintsOptions,
    resetFocusedHintIndex,
    isSearchQueryFromHint,
  );

  function handleSubmit(e) {
    e.preventDefault();

    addSearch(trimmedQuery);
    LotService.removeLastViewedLot();
    setInputFocused(false);

    setTimeout(() => {
      inputRef.current?.blur();
    });

    if (isOnPage(SPA_CONFIG.SEARCH)) {
      const url = RouterService.getRoute('searchResults', params);
      window.history.pushState({ path: url }, '', url);
      dispatchEvent(new PopStateEvent('popstate', { state: url }));
      updateSuggestions();
      return;
    }

    RouterService.redirect('searchResults', params);
  }

  function handleClearButtonClick() {
    setIsSearchQueryFromHint(false);
    clearSuggestions();
  }

  function handleInputBlur() {
    if (isHintsDropdownLocked) {
      return;
    }

    setInputFocused(false);
    setIsSearchQueryFromHint(false);
    setSearchQuery(trimmedQuery);
  }

  function handleInputChange() {
    setIsSearchQueryFromHint(false);
  }

  function handleInputKeyDown(e) {
    const allowedKeyCodes = [38, 40];
    const hintsArray = suggestions.length ? suggestions : recentSearches;

    if (!allowedKeyCodes.includes(e.keyCode) || !hintsArray.length) {
      return;
    }

    e.preventDefault();

    const nextFocusedHintIndex = updateFocusedHintIndex(hintsArray, e.keyCode === allowedKeyCodes[0] ? -1 : 1);

    setIsSearchQueryFromHint(true);
    setSearchQuery(hintsArray[nextFocusedHintIndex]);
  }

  function handleDeleteSearch(recentSearch) {
    deleteSearch(recentSearch);
    setTimeout(() => inputRef.current.focus(), hintsDropdownLockTimeout);
  }

  function handleSuggestionClick(suggestion) {
    setIsSearchQueryFromHint(true);
    setSearchQuery(suggestion);

    setTimeout(() => {
      submitButtonRef.current.click();
    });
  }

  useEventListener('submit', handleSubmit, formRef.current);
  useEventListener('click', handleClearButtonClick, clearButtonRef.current);
  useEventListener('mousedown', temporaryLockHintsDropdown, clearButtonRef.current);
  useEventListener('blur', handleInputBlur, inputRef.current);
  useEventListener('keydown', handleInputKeyDown, inputRef.current);
  useEventListener('input', handleInputChange, inputRef.current);

  const hasHints = !!recentSearches.length || !!suggestions.length || !!popularSearches.length;

  useEffect(() => {
    setHasHints(hasHints);
  }, [hasHints]);

  if (!hasHints || !isInputFocused) {
    return null;
  }

  return (
    <div className={classes.searchSuggestionsWrap}>
      <div
        className={classes.searchSuggestions}
        onMouseMove={resetFocusedHintIndex}
        style={{ maxHeight: suggestionsMenuMaxHeight }}
      >
        {isSearchQueryFromHint ? (
          <>
            {suggestions.length ? (
              <SuggestionsList
                suggestions={suggestions}
                focusedHintIndex={focusedHintIndex}
                handleSuggestionClick={handleSuggestionClick}
                searchQuery={searchQuery}
                classes={classes}
              />
            ) : (
              <RecentSearchesList
                classes={classes}
                recentSearches={recentSearches}
                focusedHintIndex={focusedHintIndex}
                handleSuggestionClick={handleSuggestionClick}
                deleteSearch={handleDeleteSearch}
                lockDropdown={temporaryLockHintsDropdown}
              />
            )}
          </>
        ) : (
          <>
            {searchQuery ? (
              <SuggestionsList
                suggestions={suggestions}
                focusedHintIndex={focusedHintIndex}
                handleSuggestionClick={handleSuggestionClick}
                searchQuery={searchQuery}
                classes={classes}
              />
            ) : (
              <RecentSearchesList
                classes={classes}
                recentSearches={recentSearches}
                focusedHintIndex={focusedHintIndex}
                handleSuggestionClick={handleSuggestionClick}
                deleteSearch={handleDeleteSearch}
                lockDropdown={temporaryLockHintsDropdown}
              />
            )}
          </>
        )}

        <PopularSearches
          searches={popularSearches}
          captionClassName={classes.suggestionCaption}
          handleClick={handleSuggestionClick}
        />
      </div>
    </div>
  );
}

export default SearchSuggestions;
