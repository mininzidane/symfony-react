import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import SortBy from 'frontend/js/components/SortBy';
import QueryInput from 'frontend/js/components/QueryInput';
import useStyles from './useStyles';

function Controls({ sort, onSortChange, query, onQueryChange }) {
  const intl = useIntl();
  const classes = useStyles();

  function f(id) {
    return intl.formatMessage({ id });
  }

  return (
    <div className="d-if ai-ct maw-100 fxw-w">
      <SortBy
        triggerClassName={classes.sortControl}
        value={sort}
        options={[
          {
            label: `${f('shared.label.saleDate')} (${f('shared.label.sort.date.asc')})`,
            field: 'date',
            order: 'asc',
          },
          {
            label: `${f('shared.label.saleDate')} (${f('shared.label.sort.date.desc')})`,
            field: 'date',
            order: 'desc',
          },
          {
            label: `${f('todayAuctions.controls.location')} (${f('shared.label.sort.alphabetic.asc')})`,
            field: 'location',
            order: 'asc',
          },
          {
            label: `${f('todayAuctions.controls.location')} (${f('shared.label.sort.alphabetic.desc')})`,
            field: 'location',
            order: 'desc',
          },
        ]}
        onChange={onSortChange}
      />
      <QueryInput
        className={classes.queryInput}
        value={query}
        placeholder={intl.formatMessage({ id: 'todayAuctions.controls.searchPlaceholder' })}
        onChange={onQueryChange}
      />
    </div>
  );
}

Controls.propTypes = {
  sort: PropTypes.shape({}).isRequired,
  query: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default Controls;
