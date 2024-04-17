import React from 'react';
import classnames from 'classnames';
import IBox from 'backend/js/components/IBox';
import NumberService from 'backend/js/lib/utils/NumberService';
import BidService from 'backend/js/api/BidService';
import CustomerShort from 'backend/js/views/_Shared/Micro/CustomerShort';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import InventoryBid from 'backend/js/views/_Shared/InventoryBid';
import useInventoryPageContext from '../../../_Context/useInventoryPageContext';

function BidInformation() {
  const { customer, inventoryItem, lotPurchase, currentBid, canAssignBid, reloadInventoryItem } =
    useInventoryPageContext();

  const { highBid, currency, buyItNow, bidStatus, statusString, sold } = inventoryItem;
  const isWon = bidStatus === BidService.STATUS_YOU_WON;
  const isCounterbid = bidStatus === BidService.COUNTER_BID_STATUSES.includes(bidStatus);
  const allowShipping = Boolean(!sold || isCounterbid);
  const maxBid = currentBid?.maxBid;
  const hasMaxBid = Boolean(maxBid);

  function handleBidSuccess() {
    reloadInventoryItem();
  }

  return (
    <IBox title="Bid Information" contentClassName="no-padding">
      <span
        className={classnames('lot-status label', {
          'label-danger': Boolean(sold && !isWon && !isCounterbid),
          'label-default': Boolean(!sold || isWon || isCounterbid),
        })}
      >
        {statusString}
      </span>
      <table className="table table-bordered bid-details">
        <tbody>
          {lotPurchase && (
            <tr>
              <td>Lot Purchase</td>
              <td>
                <a href={RouterService.getRoute('backendLotPurchaseView', null, { token: lotPurchase.token })}>
                  {lotPurchase.token}
                </a>
              </td>
            </tr>
          )}
          {lotPurchase && lotPurchase.invoice && (
            <tr>
              <td>Invoice</td>
              <td>
                <a href={RouterService.getRoute('invoiceView', null, { token: lotPurchase.invoice.token })}>
                  {lotPurchase.invoice.token}
                </a>
              </td>
            </tr>
          )}

          {Boolean(currentBid) && (
            <>
              <tr className={`bid-status-${currentBid.status.replaceAll(' ', '-').toLowerCase()}`}>
                <th>Bidder</th>
                <td>
                  <span className="bid-status">{currentBid.status}</span>
                  {currentBid.customer && <CustomerShort customer={currentBid.customer} />}

                  {canAssignBid && (
                    <a href={RouterService.getRoute('bidAssign', null, { id: currentBid.id })}>assign bid</a>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Bid Date</th>
                <th>{DateTimeService.formatFromISOString(currentBid.addedAt, 'MM/dd/yyyy H:mmaaa')}</th>
              </tr>
            </>
          )}

          {!isWon && (
            <>
              <tr>
                <th scope="row">Current Bid</th>
                <td>
                  {NumberService.formatCurrency(highBid, currency)}
                  {Boolean(buyItNow && !sold) && (
                    <>
                      <br />
                      <span className="buy-it-now" title="Buy It Now">
                        BIN: {NumberService.formatCurrency(buyItNow, currency)}
                      </span>
                    </>
                  )}
                </td>
              </tr>

              {hasMaxBid && (
                <tr>
                  <th scope="row">Max Bid</th>
                  <td>{NumberService.formatCurrency(maxBid, currency)}</td>
                </tr>
              )}

              <tr>
                {customer && (
                  <>
                    <td colSpan="2">
                      <InventoryBid
                        inventoryItem={inventoryItem}
                        customer={customer}
                        currentBid={currentBid}
                        allowShippingPreorder={allowShipping}
                        shippingAutoInit={allowShipping}
                        onSubmitSuccess={handleBidSuccess}
                      />
                    </td>
                  </>
                )}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </IBox>
  );
}

export default BidInformation;
