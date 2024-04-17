import React from 'react';
import PropTypes from 'prop-types';
import LocationPopper from 'frontend/js/views/Shared/LocationPopper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function Location({ auction }) {
  const classes = useStyles();

  return (
    <LocationPopper
      date={DateTimeService.parseDateInLocalTimezone(auction.startedAt)}
      id={auction.location.sourceId}
      name={auction.location.name}
      auction={auction.inventoryAuction}
      trigger={<div className={classes.trigger}>{auction.location.name}</div>}
      keepMounted={false}
    />
  );
}

Location.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default Location;
