import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import ModalLink from 'backend/js/components/ModalLink';
import useModal from 'backend/js/hooks/useModal';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import TooltipOnHover from 'backend/js/components/TooltipOnHover';
import Gallery from 'backend/js/views/_Shared/Gallery';
import LotService from 'backend/js/api/LotService';
import CopyButton from 'backend/js/components/CopyButton';
import LotDetailsModal from 'backend/js/views/_Shared/Modals/LotDetailsModal';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindow from 'backend/js/components/ModalWindow';
import AuctionHighlight from './AuctionHighlight';
import VIN from './VIN';
import CopartLogo from './img/copartLogo.svg';
import IAALogo from './img/iaaLogo.svg';
import ABMLogo from './img/abmLogo.png';
import Badges from './Badges';
import useStyles from './useStyles';

function LotDescription({ lot, lotPurchase, customer, isVisibleSaleData, shippingOrder }) {
  const classes = useStyles();
  const { enableRefresh, disableRefresh } = useCounterBidContext();
  const isCopart = lot.inventoryAuction === LotService.AUCTION_COPART;
  const isIAA = lot.inventoryAuction === LotService.AUCTION_IAA;
  const lotDetailsRoute = customer
    ? RouterService.getRoute('customerLot', null, { lotId: lot.id, customerId: customer.id })
    : RouterService.getRoute('lotDetails', null, { id: lot.id });

  const { isModalOpen, toggleModal } = useModal();
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  function handleClickOpenLotDetails(e) {
    e.preventDefault();
    toggleModal(true);
  }

  return (
    <>
      <div className={classes.row}>
        {lotPurchase && lotPurchase.token ? (
          <a
            href={RouterService.getRoute('backendLotPurchaseView', null, { token: lotPurchase.token })}
            target="_blank"
            rel="noreferrer"
          >
            {lot.description}
          </a>
        ) : (
          <>{shippingOrder?.vehicleYearMakeModel ? shippingOrder.vehicleYearMakeModel : lot.description}</>
        )}
        <AuctionHighlight lot={lot} />

        {lot.instantOffer && lot.instantOffer.ref && (
          <a
            href={RouterService.getRoute('instantOffersList', {
              instantOffersList: 'all_inventory',
              ref_or_vin_or_lot: lot.instantOffer.ref,
            })}
            className="badge badge-success ml-5"
          >
            SYC
          </a>
        )}
      </div>

      <div className={classes.row}>
        <span className="mr-5">{lot.inventoryAuction}</span>
        <a href={lotDetailsRoute} onClick={handleClickOpenLotDetails} target="_blank" rel="noreferrer">
          {lot.id}
        </a>
        <LotDetailsModal
          isModalOpen={isModalOpen}
          onModalClose={() => toggleModal(false)}
          inventoryId={lot.id}
          customer={customer}
          auction={lot.inventoryAuction}
        />
        <CopyButton value={lot.id.toString()} />

        {isCopart && (
          <a
            className="ml-5"
            href={RouterService.getRoute('copartLotPage', null, { id: lot.id })}
            target="_blank"
            rel="noreferrer"
          >
            <img src={CopartLogo} alt="Copart Logo" width="16px" height="16px" />
          </a>
        )}

        {isIAA && <img className="ml-5" src={IAALogo} alt="IAA Logo" width="22px" height="16px" />}

        <a
          className="ml-5"
          href={RouterService.getRoute('lotSlugPage', null, { id: lot.id, slug: lot.slug })}
          target="_blank"
          rel="noreferrer"
        >
          <img src={ABMLogo} alt="ABM Logo" width="16px" height="16px" />
        </a>

        <TooltipOnHover
          placement="right"
          style={{
            width: 660,
            maxWidth: 660,
          }}
          TransitionProps={{
            mountOnEnter: true,
            unmountOnExit: true,
          }}
          trigger={
            <span className="ml-5 d-f ai-ct">
              <i className="fa fa-camera" style={{ fontSize: '16px' }} />
              <span className="ml-5">+{lot.images.length}</span>
            </span>
          }
          content={<Gallery images={lot.images} title={lot.description} />}
        />
      </div>

      <VIN lot={lot} className={classes.row} shippingOrder={shippingOrder} />

      {lot.title && (
        <div className={classes.row}>
          {lotPurchase && lotPurchase.titleDocument ? (
            <>
              <a
                href={lotPurchase.titleDocument.url}
                onClick={(e) => {
                  e.preventDefault();
                  setIsDocumentModalOpen(true);
                }}
              >
                {lot.title.name}
                {lot.title.description && <>&nbsp;{lot.title.description}</>}
              </a>
              <ModalWindow
                isOpen={isDocumentModalOpen}
                onClose={() => setIsDocumentModalOpen(false)}
                size="fullscreen"
                className={classes.iframeModalBody}
              >
                <ModalWindowHeader title="Title Document" onClose={() => setIsDocumentModalOpen(false)} />
                <ModalWindowBody className="p-20">
                  <iframe
                    src={lotPurchase.titleDocument.url}
                    title="Vehicle Title Document"
                    className={classes.iframe}
                  />
                </ModalWindowBody>
              </ModalWindow>
              &nbsp;&nbsp;
              <a href={lotPurchase.titleDocument.url} target="_blank" rel="noreferrer">
                <i className="fa fa-file-pdf-o" />
              </a>
            </>
          ) : (
            <>
              {lot.title.name}
              {lot.title.description && <>&nbsp;{lot.title.description}</>}
            </>
          )}
        </div>
      )}
      {lot.primaryDamage && (
        <div className={classes.row}>
          {lot.primaryDamage}
          {lot.secondaryDamage && <>/{lot.secondaryDamage}</>}
        </div>
      )}

      {isVisibleSaleData && (
        <>
          <div className="mt-5">
            {lot.seller && (
              <div className="ws-n">
                Seller: <b>{lot.seller}</b>
              </div>
            )}

            {lot.saleDate && (
              <div>
                Sale Date: <b>{DateTimeService.formatFromISOString(lot.saleDate)}</b>
              </div>
            )}

            {lot.saleLocation && (
              <div>
                Facility:&nbsp;
                <ModalLink
                  route={RouterService.getRoute(
                    'backendLocation',
                    { auction: lot.inventoryAuction },
                    { id: lot.saleLocation.id },
                  )}
                  title="View location detail information"
                  label={lot.saleLocation.name}
                  onModalOpen={disableRefresh}
                  onModalClose={enableRefresh}
                />
              </div>
            )}
          </div>

          {lot.recommendedBid && (
            <div className="mt-5">
              RBA:{' '}
              <b>
                {NumberService.formatCurrency(lot.recommendedBid, lot.currency)} {lot.currency}
              </b>
            </div>
          )}
        </>
      )}

      {lotPurchase && <Badges lotPurchase={lotPurchase} />}
    </>
  );
}

LotDescription.propTypes = {
  lot: PropTypes.object.isRequired,
  lotPurchase: PropTypes.object,
  customer: PropTypes.object,
  isVisibleSaleData: PropTypes.bool,
  shippingOrder: PropTypes.object,
};

LotDescription.defaultProps = {
  customer: undefined,
  lotPurchase: {},
  isVisibleSaleData: true,
  shippingOrder: {},
};

export default LotDescription;
