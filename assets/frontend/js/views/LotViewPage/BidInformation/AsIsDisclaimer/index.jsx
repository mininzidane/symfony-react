/* eslint-disable */
import React, { useState } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import LotService from 'frontend/js/api/LotService';
import BidService from 'frontend/js/api/BidService';
import useStyles from './useStyles';

function AsIsDisclaimer({ serverResponse, inventoryAuction }) {
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;
  if (serverResponse && serverResponse.bidStatus === BidService.STATUS_YOU_WON && isAbmInventory) {
    return null;
  }

  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const { getRoute } = RouterService;
  const intl = useIntl();

  const translationSets = {
    title: intl.formatMessage({ id: 'lotPage.asIsDisclaimer.title.short' }),
    modalTitle: intl.formatMessage({
      id: 'lotPage.asIsDisclaimer.modalTitle',
      defaultMessage: 'AS IS - Where IS',
    }),
    modalBody: intl.formatMessage(
      {
        id: 'lotPage.asIsDisclaimer.modalBody',
        defaultMessage: `
          When you submit a bid through AutoBidMaster, you are offering to purchase the specified vehicle at the price
          you specify. The Seller may accept the highest bid placed during the auction, and thus if you are the highest
          bidder and your bid is accepted you will be contractually bound to purchase the vehicle at the price you
          specify plus any applicable Copart auction fees. All sales are final and the highest bidder has no right of
          rescission and no refund or exchange rights.
          {br}
          {br}
          Since this vehicle is being sold "AS IS - WHERE IS", it means that the purchaser is buying it
          "with all faults" and without any warranty or guarantee of any type, express or implied. Any
          information regarding this vehicle provided by the Seller or Copart is for convenience only. It is your sole
          responsibility to ascertain, confirm, research, inspect, and investigate a vehicle and any information
          regarding such vehicle prior to bidding on it. AutoBidMaster expressly disclaims the accuracy of the vehicle
          information on this page including damage details, odometer readings and vehicle identification numbers (VIN).
          {br}
          {br}
          For more information, please refer to the
      `,
      },
      {
        br: <br />,
      },
    ),
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <div>
        {translationSets.title}
        <button type="button" onClick={() => setOpen(true)} className="tooltip__badge" style={{ marginLeft: 6 }}>
          ?
        </button>
      </div>

      <ModalWindow isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalWindowHeader title={translationSets.modalTitle} onClose={handleClose} />
        <ModalWindowBody hasFooter>
          <>
            {translationSets.modalBody}{' '}
            <a href={getRoute('terms')} target="_blank" rel="noopener noreferrer">
              {intl.formatMessage({
                id: 'shared.cta.membershipTermsAndConditions',
                defaultMessage: 'Member Terms & Conditions',
              })}
            </a>
          </>
        </ModalWindowBody>
        <ModalWindowFooter>
          <Button label="OK" onClick={handleClose} isInline />
        </ModalWindowFooter>
      </ModalWindow>
    </div>
  );
}

export default AsIsDisclaimer;
