import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import Auction from '../Auction';

function LiveAuction(props) {
  const intl = useIntl();

  return (
    <Auction
      {...props}
      colors={{ background: '#FCFAEC', subheader: '#F3F2E7', timer: '#226900' }}
      entryButton={(params) => (
        <Button
          color="green"
          size="sm"
          isNowrap
          label={intl.formatMessage({ id: 'todayAuctions.joinLiveAuction' })}
          {...params}
        />
      )}
    />
  );
}

export default LiveAuction;
