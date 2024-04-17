/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useStyles from './useStyles';

function RangeSelects({ dispatch, section, noAuth, values }) {
  const { isAuthenticated } = useCustomerHelper();
  const eventTrackingService = new EventTrackingService();
  const classes = useStyles();
  const { appliedFrom, appliedTo, maxValue, minValue } = values;

  const years = [];

  for (let year = minValue; year <= maxValue; year++) {
    years.push({ label: `${year}`, value: year });
  }

  const [optionsYearFrom, setOptionsYearFrom] = useState(years);
  const [optionsYearTo, setOptionsYearTo] = useState(years);
  const [yearFrom, setYearFrom] = useState(parseInt(appliedFrom, 10) || years[0]?.value);
  const [yearTo, setYearTo] = useState(parseInt(appliedTo, 10) || years[years.length - 1]?.value);

  function applyYearValues(yFrom = yearFrom, yTo = yearTo) {
    if (!noAuth && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    eventTrackingService.sendEvent({
      step: 'abm_carfinder_filters',
      substep: `${section}_block_click`,
    });

    dispatch({
      type: 'REFINE',
      payload: {
        type: 'MULTIVALUE',
        section,
        values: { year_from: yFrom, year_to: yTo },
        label: `${yFrom} – ${yTo}`,
      },
    });
  }

  function handleYearFromUpdate(_, yFrom) {
    setYearFrom(yFrom);
    setOptionsYearTo(years.filter((year) => year.value >= yFrom));
    applyYearValues(yFrom);
  }

  function handleYearToUpdate(_, yTo) {
    setYearTo(yTo);
    setOptionsYearFrom(years.filter((year) => year.value <= yTo));
    applyYearValues(undefined, yTo);
  }

  return (
    <div className={classes.grid}>
      <div className={classes.cell}>
        <div>
          <SelectPlane
            id="year_from"
            name="year_from"
            className={classes.select}
            value={yearFrom}
            options={optionsYearFrom}
            onChange={handleYearFromUpdate}
            convertMobileSelectValue={(value) => parseInt(value, 10)}
          />
        </div>
      </div>
      <div className={classes.separator} />
      <div className={classes.cell}>
        <div>
          <SelectPlane
            id="year_to"
            name="year_to"
            className={classes.select}
            value={yearTo}
            options={[...optionsYearTo].reverse()}
            onChange={handleYearToUpdate}
            convertMobileSelectValue={(value) => parseInt(value, 10)}
          />
        </div>
      </div>
    </div>
  );
}

RangeSelects.defaultProps = {
  values: [],
  section: '',
  noAuth: false,
  dispatch: () => {},
};

RangeSelects.propTypes = {
  values: PropTypes.shape({
    all: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        cnt: PropTypes.number,
      }),
    ),
    priority: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        cnt: PropTypes.number,
      }),
    ),
  }),
  section: PropTypes.string,
  noAuth: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default RangeSelects;
