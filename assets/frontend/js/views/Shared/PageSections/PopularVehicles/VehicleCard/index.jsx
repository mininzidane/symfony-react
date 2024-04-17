import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import Card from 'frontend/js/components/Card';
import ClockSvg from './img/clock.svg';
import useStyles from './useStyles';

function VehicleCard({ href, imageSrc, title, location, saleStartAt, highBid, currencyCode, className }) {
  const classes = useStyles();
  const intl = useIntl();
  const [timeLeft, setTimeLeft] = useState(null);

  const translationSets = {
    liveAuctionInProgress: intl.formatMessage({ id: 'shared.label.liveAuctionInProgress' }),
    day: intl.formatMessage({ id: 'shared.time.day.singleLetter' }),
    hour: intl.formatMessage({ id: 'shared.time.hour.singleLetter' }),
    minute: intl.formatMessage({ id: 'shared.time.minute.short' }),
    second: intl.formatMessage({ id: 'shared.time.second.short' }),
    location: intl.formatMessage({ id: 'shared.label.location' }),
  };

  function updateTimeLeft() {
    setTimeLeft(DateTimeService.getTimeLeft(new Date(saleStartAt)));
  }

  useEffect(() => {
    let interval;

    if (saleStartAt) {
      updateTimeLeft();
      interval = setInterval(updateTimeLeft, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href={href} className={classnames(classes.root, className)}>
      <Card className={classes.card} elevation={2}>
        <div className={classes.imageContainer}>
          <img src={imageSrc} className={classes.image} alt="Vehicle" />

          <div className={classes.labels}>
            {Boolean(timeLeft) && (
              <div className={classes.date}>
                <img src={ClockSvg} alt="Time" className={classes.timeIcon} width={14} height={14} />
                {Boolean(timeLeft.days) && (
                  <>
                    {timeLeft.days}
                    {translationSets.day}&nbsp;
                  </>
                )}
                {(Boolean(timeLeft.days) || Boolean(timeLeft.hours)) && (
                  <>
                    {timeLeft.hours}
                    {translationSets.hour}&nbsp;
                  </>
                )}
                {(Boolean(timeLeft.days) || Boolean(timeLeft.hours) || Boolean(timeLeft.minutes)) && (
                  <>
                    {timeLeft.minutes}
                    {translationSets.minute}
                    &nbsp;
                  </>
                )}
                {timeLeft.seconds}
                {translationSets.second}
              </div>
            )}

            <div className={classes.highBid}>
              {NumberService.formatCurrency(highBid)} <span>{currencyCode}</span>
            </div>
          </div>
        </div>

        <div className={classes.desc}>
          <div className={classes.title}>{title}</div>
          <div className={classes.location}>
            {translationSets.location}: {location}
          </div>
        </div>
      </Card>
    </Link>
  );
}

VehicleCard.propTypes = {
  imageSrc: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  highBid: PropTypes.number,
  currencyCode: PropTypes.string,
  saleStartAt: PropTypes.string,
  className: PropTypes.string,
};

VehicleCard.defaultProps = {
  imageSrc: '',
  href: '',
  title: '',
  location: '',
  currencyCode: '',
  saleStartAt: '',
  highBid: null,
  className: '',
};

export default VehicleCard;
