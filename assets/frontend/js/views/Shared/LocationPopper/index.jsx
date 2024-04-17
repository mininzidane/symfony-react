import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AuctionService from 'frontend/js/api/AuctionService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ContentPopover from 'frontend/js/components/ContentPopover';
import useStyles from './useStyles';
import Content from './Content';

function LocationPopper({ id, date, auction, name, defaultLane, isCtaBlockHidden, ...restProps }) {
  const classes = useStyles({ isCtaBlockHidden });

  const payload = { id, date: DateTimeService.format(new Date(date), 'yyyy-MM-dd'), auction };

  const {
    data,
    isLoading: loading,
    refetch: getLocation,
  } = useQuery(['location-data', payload], () => AuctionService.getLocation(payload), { enabled: false });

  const isLoading = loading && !data;

  return (
    <ContentPopover
      onOpen={() => getLocation()}
      popoverClass={classnames(classes.popover, loading && classes.loading)}
      popoverTitle={name}
      isInline
      {...restProps}
    >
      {isLoading ? (
        <SpinnerWheel isCentered size={40} thickness={3} style={{ marginTop: -10 }} />
      ) : (
        <Content data={data} defaultLane={defaultLane} isCtaBlockHidden={isCtaBlockHidden} />
      )}
    </ContentPopover>
  );
}

LocationPopper.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.instanceOf(Date),
  auction: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultLane: PropTypes.string,
  isCtaBlockHidden: PropTypes.bool,
};

LocationPopper.defaultProps = {
  defaultLane: '',
  date: null,
  auction: '',
  isCtaBlockHidden: false,
};

export default LocationPopper;
