import React from 'react';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import { FormattedMessage } from 'react-intl-phraseapp';
import Chips from '../Chips';
import useStyles from './useStyles';
import ClearAllButton from './ClearAllButton';

function FiltersChips() {
  const [{ filters, filtersCount }] = useFiltersContext();
  const hasFilters = filters && Boolean(filtersCount);
  const classes = useStyles();

  if (!hasFilters) {
    return null;
  }

  return (
    <div className={classes.chipsContainer}>
      <header className={classes.header}>
        <div className={classes.label}>
          <FormattedMessage id="shared.label.searchFilters" />
        </div>
        <ClearAllButton />
      </header>

      <Chips />
    </div>
  );
}

FiltersChips.propTypes = {};

export default FiltersChips;
