import { useEffect, useState } from 'react';
import axios from 'axios';
import LotService from 'frontend/js/api/LotService';
import useMarketAuctions from 'frontend/js/views/SiteHeader/Main/Search/SearchSuggestions/useMarketAuctions';

const { CancelToken } = axios;
let suggestionCancelToken;

function useSuggestions({ searchQuery, listSize, marketKey }, resetFocusedHintIndex, isSearchQueryFromHint) {
  const SUGGESTIONS_UPDATE_TIMEOUT = 300;

  const selectedAuctions = useMarketAuctions(marketKey);
  const [suggestions, setSuggestions] = useState([]);

  function clearSuggestions() {
    setSuggestions([]);
  }

  function cancelSuggestionsRequest() {
    if (typeof suggestionCancelToken === 'function') {
      suggestionCancelToken();
      suggestionCancelToken = undefined;
    }
  }

  function updateSuggestions() {
    if (searchQuery.length === 0) {
      clearSuggestions();
      return;
    }

    cancelSuggestionsRequest();

    const requestOptions = {
      cancelToken: new CancelToken((c) => {
        suggestionCancelToken = c;
      }),
    };

    LotService.getSearchSuggestions(searchQuery.trim(), selectedAuctions, requestOptions)
      .then((response) => setSuggestions(response.slice(0, listSize)))
      .catch(() => {
        /** Ignore */
      });
  }

  useEffect(() => {
    let updateSuggestionsTimeout = null;
    const skip = !searchQuery && suggestions.length === 0;

    if (!skip) {
      if (isSearchQueryFromHint) {
        return undefined;
      }

      updateSuggestionsTimeout = setTimeout(updateSuggestions, SUGGESTIONS_UPDATE_TIMEOUT);
      resetFocusedHintIndex();
    }

    return () => clearTimeout(updateSuggestionsTimeout);
  }, [searchQuery]);

  return {
    suggestions,
    clearSuggestions,
    updateSuggestions,
  };
}

export default useSuggestions;
