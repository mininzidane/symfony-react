import React from 'react';
import classnames from 'classnames';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import { useDisplaySettingsContext } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import CardViewSvg from './icons/CardViewIcon';
import ListViewIcon from './icons/ListViewIcon';
import useStyles from './useStyles';

function ViewModeControl() {
  const classes = useStyles();
  const [{ view, setView, viewOptions }] = useDisplaySettingsContext();
  const eventTrackingService = new EventTrackingService();

  function handleTableViewClick() {
    setView(viewOptions[1].value);
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'full_button_navigation_click' });
  }

  function handleGridViewClick() {
    setView(viewOptions[0].value);
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'compact_button_navigation_click' });
  }

  return (
    <div className={classes.root} id="VIEW_SELECT">
      <button
        type="button"
        title={viewOptions[0].label}
        onClick={handleGridViewClick}
        className={classnames(classes.button, { 'is-active': view === viewOptions[0].value })}
      >
        <CardViewSvg />
      </button>

      <button
        type="button"
        title={viewOptions[1].label}
        onClick={handleTableViewClick}
        className={classnames(classes.button, { 'is-active': view === viewOptions[1].value })}
      >
        <ListViewIcon />
      </button>
    </div>
  );
}

export default ViewModeControl;
