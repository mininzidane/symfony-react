import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import useSaleDateTimer from 'frontend/js/hooks/useSaleDateTimer';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import ButtonLink from 'frontend/js/components/ButtonLink';
import getCountdownDate from './getCountdownDate';
import useStyles from './useStyles';

function SaleDateTimer({ date, lot, isCounterBidState }) {
  const classes = useStyles();

  const countDownDate = isCounterBidState ? getCountdownDate(date, lot) : date;
  const { isTimeLeft, timeString } = useSaleDateTimer(countDownDate, lot);
  const intl = useIntl();

  return (
    <>
      {isTimeLeft ? (
        <strong className={classes.timer}>
          <span>{timeString}</span>
        </strong>
      ) : (
        <JoinAuctionButton
          component={ButtonLink}
          lot={lot}
          label={intl.formatMessage({ id: 'shared.label.liveAuctionInProgress' })}
          className={classnames(classes.liveAuctionLabel, 'js-track-event')}
          data-step="abm_lotpage"
          data-substep="time_is_up_join_now_button_click"
        />
      )}
    </>
  );
}

SaleDateTimer.propTypes = {
  isCounterBidState: PropTypes.bool,
  date: PropTypes.shape({
    dashArray: PropTypes.number,
    isTimeLeft: PropTypes.bool,
    d: PropTypes.number,
    h: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number,
    progress: PropTypes.number,
    liveLink: PropTypes.string,
  }).isRequired,
  lot: LotShape.isRequired,
};

SaleDateTimer.defaultProps = {
  isCounterBidState: false,
};

export default SaleDateTimer;
