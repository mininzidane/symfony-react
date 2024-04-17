import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';

function PickupInfo() {
  const intl = useIntl();

  const translationSets = {
    yourVehicleWillBePickedUp: intl.formatMessage(
      { id: 'receiptPage.yourVehicleWillBePickedUp' },
      { a: (chunks) => <Link routeParams={['lotsWon']}>{chunks}</Link> },
    ),
    freeStorage: intl.formatMessage({ id: 'receiptPage.rememberTheAuctionOffersDaysOfFreeStorage' }),
  };

  return (
    <div className="m-0-a mt-50" style={{ maxWidth: '480px' }}>
      <div className="text-sm ta-l bdrs-md bg-cloud" style={{ padding: '12px 22px 20px' }}>
        {translationSets.yourVehicleWillBePickedUp}
        <br />
        <br />
        {translationSets.freeStorage}
      </div>
    </div>
  );
}

export default PickupInfo;
