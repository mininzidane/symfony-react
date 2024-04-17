/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Input from './Input';
import Slider from './Slider';
import useStyles from './useStyles';

function RangeSlider({ dispatch, section, noAuth, values }) {
  const { formatNumber } = NumberService;
  const { isAuthenticated } = useCustomerHelper();
  const eventTrackingService = new EventTrackingService();
  const classes = useStyles();
  const { appliedFrom, appliedTo, maxValue: MAX_THRESHOLD, minValue: MIN_THRESHOLD } = values;

  const [minValue, setMinValue] = useState(appliedFrom);
  const [maxValue, setMaxValue] = useState(appliedTo);

  function handleApplyClick() {
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
        values: { odometer_from: minValue, odometer_to: maxValue },
        label: `${formatNumber(minValue)} – ${formatNumber(maxValue)}`,
      },
    });
  }

  return (
    <>
      <div>
        <div className={classes.grid}>
          <div className={classes.cell}>
            <div className={classes.inputLabel}>
              <FormattedMessage id="shared.label.min" />
            </div>
            <div>
              <Input
                value={minValue}
                onChange={setMinValue}
                minThreshold={MIN_THRESHOLD}
                maxThreshold={maxValue}
                formatNumber={formatNumber}
              />
            </div>
          </div>
          <div className={classes.separator} />
          <div className={classes.cell}>
            <div className={classes.inputLabel}>
              <FormattedMessage id="shared.label.max" />
            </div>
            <div>
              <Input
                value={maxValue}
                onChange={setMaxValue}
                minThreshold={MIN_THRESHOLD}
                maxThreshold={MAX_THRESHOLD}
                minValue={minValue}
                formatNumber={formatNumber}
              />
            </div>
          </div>
        </div>

        <div className={classes.sliderWrap}>
          <Slider
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            minThreshold={MIN_THRESHOLD}
            maxThreshold={MAX_THRESHOLD}
          />
        </div>

        <ButtonOutlined
          label={<FormattedMessage id="shared.label.apply" />}
          onClick={handleApplyClick}
          className={classes.apply}
          isBackgroundWhite
          isThinBorder
        />
      </div>
    </>
  );
}

RangeSlider.defaultProps = {
  values: [],
  section: '',
  noAuth: false,
  dispatch: () => {},
};

RangeSlider.propTypes = {
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

export default RangeSlider;
