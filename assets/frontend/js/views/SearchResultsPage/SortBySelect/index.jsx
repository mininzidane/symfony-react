/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import SortSettings from 'frontend/js/components/SortSettings';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import { useDisplaySettingsContext } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import classnames from 'classnames';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function SortBySelect() {
  const classes = useStyles();
  const [{ sort: currentSort, setSort, sortOptions }] = useDisplaySettingsContext();
  const gridViewSortOptions = sortOptions.filter(({ isTableOption }) => !isTableOption);
  const eventTrackingService = new EventTrackingService();

  function handleChange(value) {
    setSort(value);
    eventTrackingService.sendEvent({
      step: 'abm_carfinder_filters',
      substep: `sortby_button_navigation_click`,
    });
  }

  useEffect(() => {
    if (currentSort.isTableOption) {
      setSort(sortOptions[0]);
    }
  }, []);

  if (currentSort.isTableOption) {
    return null;
  }

  return (
    <div className={classes.root}>
      <SortSettings
        placement="bottom-start"
        value={currentSort}
        isFlipEnabled={false}
        trigger={({ label }) => (
          <ButtonLink
            className={classes.trigger}
            label={
              <>
                <span className={classes.label}>{label.property}</span>
                <div className={classnames('select-plane__arrow', classes.selectArrow)} />
              </>
            }
          />
        )}
        renderLabel={(label) => <span>{label.property}</span>}
        options={gridViewSortOptions || []}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortBySelect;
