import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import CountryService from 'frontend/js/api/CountryService';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useEventListener from 'frontend/js/hooks/useEventListener';
import InventoryMarketSelect from './InventoryMarketSelect';
import useInventoryMarket from './InventoryMarketSelect/useInventoryMarket';
import useFocused from './useFocused';
import SubmitButton from './SubmitButton';
import useStyles from './useStyles';

const SearchSuggestions = React.lazy(() => import('./SearchSuggestions'));
const ClearButton = React.lazy(() => import('./ClearButton'));

const SearchForm = () => {
  const classes = useStyles();
  const inputRef = useRef();
  const submitButtonRef = useRef();
  const clearButtonRef = useRef();
  const formRef = useRef();

  const [searchQuery, setSearchQuery] = useState(String(RouterService.getQueryParam('q') || ''));
  const [hasHits, setHasHints] = useState(false);
  const { isInputFocused, setInputFocused, hasBeenFocused, setHasBeenFocused } = useFocused();

  const {
    market,
    setMarket,
    marketKey,
    marketStorageKey,
    isMarketDropdownOpen,
    setIsMarketDropdownOpen,
    inputPadding,
    inventoryTypeSelectRef,
  } = useInventoryMarket();

  useEventListener('mouseover', () => setHasBeenFocused(true), inputRef.current);

  const hasFormFocusStyles = isInputFocused || isMarketDropdownOpen;
  const isHintsDropdownOpen = hasHits && isInputFocused;
  const trimmedQuery = searchQuery.trim();

  const params = {
    ...(marketKey && { market: marketKey }),
    ...(trimmedQuery && { q: trimmedQuery }),
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (hasBeenFocused) {
      return;
    }

    RouterService.redirect('searchResults', params);
  }

  return (
    <form
      action={RouterService.getRoute('searchResults', params)}
      className={classnames(classes.root, { 'is-focused': hasFormFocusStyles })}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      {!CountryService.isUsa() && (
        <InventoryMarketSelect
          market={market}
          setInventoryMarket={setMarket}
          triggerRef={inventoryTypeSelectRef}
          localStorageKey={marketStorageKey}
          isOpen={isMarketDropdownOpen}
          setIsOpen={setIsMarketDropdownOpen}
          isFocused={hasFormFocusStyles}
        />
      )}

      <input
        className={classnames(classes.input, { 'is-empty': !searchQuery }, 'qa_id_search_field')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onTouchStart={() => setInputFocused(true)}
        ref={inputRef}
        type="search"
        name="q"
        placeholder={t('header.search.placeholder')}
        aria-label={t('header.search.placeholder')}
        autoComplete="off"
        style={{ paddingLeft: inputPadding }}
      />

      <SuspenseWrap init={Boolean(searchQuery) || hasBeenFocused} fallback={null}>
        <ClearButton
          searchQuery={searchQuery}
          clearButtonRef={clearButtonRef}
          inputRef={inputRef}
          setSearchQuery={setSearchQuery}
        />
      </SuspenseWrap>

      <SubmitButton className={classnames(classes.button, 'qa_submit_search_button')} buttonRef={submitButtonRef} />

      <SuspenseWrap init={hasBeenFocused} fallback={null}>
        <SearchSuggestions
          inputRef={inputRef}
          clearButtonRef={clearButtonRef}
          submitButtonRef={submitButtonRef}
          formRef={formRef}
          searchQuery={searchQuery.trim()}
          setSearchQuery={setSearchQuery}
          setHasHints={setHasHints}
          setInputFocused={setInputFocused}
          marketKey={marketKey}
          isInputFocused={isInputFocused}
          params={params}
          trimmedQuery={trimmedQuery}
        />
      </SuspenseWrap>

      <div
        className={classnames(
          classes.searchDropdownOverlay,
          isMarketDropdownOpen || (isHintsDropdownOpen && 'is-shown'),
        )}
      />
    </form>
  );
};

export default SearchForm;
