import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useStyles from './useStyles';

function SearchFilter({ query, setQuery, section }) {
  const classes = useStyles();
  const intl = useIntl();
  const eventTrackingService = new EventTrackingService();

  function handleFocus() {
    eventTrackingService.sendEvent({
      step: 'abm_carfinder_filters',
      substep: `${section}_search_field_click`,
    });
  }

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={handleFocus}
        value={query}
        placeholder={intl.formatMessage({ id: 'shared.cta.search' })}
      />
      {query && (
        <button type="button" className={classes.resetQueryBtn} onClick={() => setQuery('')}>
          <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px">
            <path
              d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

SearchFilter.defaultProps = {
  query: '',
  setQuery: () => {},
  section: '',
};

SearchFilter.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  section: PropTypes.string,
};

export default SearchFilter;
