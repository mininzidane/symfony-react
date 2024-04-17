import React from 'react';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';

function ResultsCount() {
  const [{ total }] = useSearchData();
  const labelId = total > 1 ? 'searchResultsPage.resultsFound' : 'searchResultsPage.resultFound';

  return (
    <span>
      {NumberService.formatNumber(total)} <FormattedMessage id={labelId} />
    </span>
  );
}

export default ResultsCount;
