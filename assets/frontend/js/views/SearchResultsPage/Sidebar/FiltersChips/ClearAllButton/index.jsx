import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useStyles from './useStyles';

function ClearAllButton() {
  const [{ dispatch }] = useFiltersContext();
  const classes = useStyles();

  return (
    <button
      className={classes.root}
      type="button"
      onClick={() => {
        dispatch({ type: 'CLEAR' });

        const eventTrackingService = new EventTrackingService();
        eventTrackingService.sendEvent({
          step: 'abm_carfinder_filters',
          substep: 'resetall_button_navigation_click',
        });
      }}
    >
      <span>
        <FormattedMessage id="shared.cta.reset" />
      </span>

      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="makeStyles-arrow-502 makeStyles-arrow-493"
      >
        <rect y="7" width="2" height="12" fill="#2158F5" transform="rotate(-90 0 7)" />
      </svg>
    </button>
  );
}

export default ClearAllButton;
