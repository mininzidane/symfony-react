import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function CurrentSale({ auction }) {
  const classes = useStyles();
  const { status, location, startedAt } = auction;

  const isLive = status === 'live';

  return (
    <ButtonLink
      href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
        slug: location.slug,
        date: DateTimeService.format(DateTimeService.parseDateInLocalTimezone(startedAt), 'yyyyMMdd'),
      })}
      className={classnames(classes.button, isLive && classes.live)}
      label={isLive ? <FormattedMessage id="shared.label.liveNow" /> : DateTimeService.format(new Date(startedAt))}
    />
  );
}

CurrentSale.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default CurrentSale;
