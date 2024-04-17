/* eslint-disable react/prop-types,react/destructuring-assignment */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import Auction from '../Auction';

function UpcomingAuction(props) {
  const intl = useIntl();

  return (
    <Auction
      {...props}
      colors={{ background: '#FFF', subheader: '#F2F2F2', timer: '#4F4F4F' }}
      entryButton={(params) => (
        <Button
          color="blue"
          size="sm"
          isNowrap
          label={intl.formatMessage({ id: 'todayAuctions.viewItems' })}
          {...params}
        />
      )}
    />
  );
}

export default UpcomingAuction;
