/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import SortSettings from 'frontend/js/components/SortSettings';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import classnames from 'classnames';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SortContext from '../_Context/SortContext';
import useStyles from './useStyles';

function SortBySelect() {
  const classes = useStyles();
  const { sort, setSort, sortOptions } = useContext(SortContext);
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
    if (sort.isTableOption) {
      setSort(sortOptions[0]);
    }
  }, []);

  if (sort.isTableOption) {
    return null;
  }

  return (
    <div className={classes.root}>
      <SortSettings
        placement="bottom-start"
        value={sort}
        isFlipEnabled={false}
        trigger={({ label }) => (
          <ButtonLink
            className={classes.trigger}
            label={
              <>
                <span className={classes.label}>{label.split(' (')[0]}</span>
                <div className={classnames('select-plane__arrow', classes.selectArrow)} />
              </>
            }
          />
        )}
        renderLabel={(label) => <span>{label.split(' (')[0]}</span>}
        options={gridViewSortOptions || []}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortBySelect;
