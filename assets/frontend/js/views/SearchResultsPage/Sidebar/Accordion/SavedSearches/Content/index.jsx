import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Link from 'frontend/js/components/Link';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useSavedSearches from './useSavedSearches';
import useStyles from './useStyles';

function Content({ onLinkClick }) {
  const classes = useStyles();
  const [searches, total, data, loading] = useSavedSearches();

  if (!data && loading) {
    return (
      <div className={classes.loader}>
        <SpinnerWheel isCentered />
      </div>
    );
  }

  if (!total) {
    return (
      <div className={classes.empty}>
        <FormattedMessage id="searchResultsPage.savedSearches.noResults" />
      </div>
    );
  }

  return (
    <div>
      {searches.map((search) => (
        <div className={classes.row} key={search.id}>
          <Link
            className={classes.title}
            href={RouterService.getRoute('searchResults', { saved_search_hash: search.hash })}
            onClick={onLinkClick}
          >
            {search.title}
          </Link>
          <span className={classes.count}>{NumberService.formatNumber(search.total)}</span>
        </div>
      ))}
    </div>
  );
}

Content.defaultProps = {
  onLinkClick: () => {},
};

Content.propTypes = {
  onLinkClick: PropTypes.func,
};

export default Content;
