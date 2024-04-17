/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import AuctionService from 'frontend/js/api/AuctionService';
import LotService from 'frontend/js/api/LotService';
import Link from 'frontend/js/components/Link';
import AmountCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/AmountCell';
import AvailableDateCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/AvailableDateCell';
import PortOfDestinationCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/PortOfDestinationCell';
import VehicleCategoryCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/VehicleCategoryCell';
import ContainerIdCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/ContainerIdCell';
import DateCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/DateCell';
import ValueCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/ValueCell';
import PurchaseDueCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/PurchaseDueCell';
import ClearVinCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/ClearVinCell';
import NotesCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/NotesCell';
import preparePurchaseData from 'frontend/js/views/Account/BidStatusPage/Shared/preparePurchaseData';
import prepareInvoiceData from 'frontend/js/views/Account/BidStatusPage/Shared/prepareInvoiceData';
import prepareShippingOrderData from 'frontend/js/views/Account/BidStatusPage/Shared/prepareShippingOrderData';
import { B2bShippingCell } from 'frontend/js/components/ThemedTable/LotsWonCells';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import PhotoCell from './PhotoCell';

function getRowsArray(invoices, brokerDisplayOnlyLotPurchase, noteStats, isNoteStatsLoading) {
  return invoices.map((invoice) => {
    const shippingOrder = invoice.lotPurchase?.activeShippingOrder || invoice?.shippingOrder || null;
    if (invoice.lotPurchase?.activeShippingOrder) {
      shippingOrder.lotPurchase = invoice.lotPurchase;
    }

    const {
      id,
      href,
      auction,
      auctionFullName,
      fullName,
      purchaseDate,
      vehicleImage,
      ymm,
      vin,
      vinHash,
      vehicleType,
      titleStatus,
      locationState,
    } = preparePurchaseData(invoice?.lotPurchase, invoice?.lot, invoice);

    const {
      portOfLoading,
      portOfDestination,
      pickUpDateEst,
      pickUpDateAct,
      deliveredToWarehouseEst,
      deliveredToWarehouseAct,
      titleStatus: ehTitleStatus,
      titleReceived,
      vehicleCategory,
      keys,
      documents,
      departureDateFromUS,
      estDeliveryDate,
      bookingId,
      containerId,
      shippingLine,
      shippingLineUrl,
      token: shippingOrderToken,
    } = prepareShippingOrderData(shippingOrder);

    const {
      bidAmount,
      copartFees,
      transactionFee,
      documentationFee,
      storageFee,
      groundShipping,
      oceanShipping,
      paidAmount,
    } = prepareInvoiceData(invoice);

    const invoiceCustomerId = invoice?.customer?.id;

    const currentNoteStats = id && auction && noteStats && noteStats[auction] && noteStats[auction][id];

    const formattedLotId =
      (id &&
        (auction === AuctionService.auctionNames.COPART ? (
          <a href={href}>{id}</a>
        ) : (
          <a href={href}>
            {auction} {id}
          </a>
        ))) ||
      null;

    const row = [
      {
        content: <ValueCell value={fullName && <span className="no-drag">{fullName}</span>} emptyValue="" />,
      },
      {
        content: <DateCell date={purchaseDate} className="no-drag" />,
      },
      {
        content: vehicleImage && <PhotoCell src={vehicleImage} lot={invoice?.lot} ymm={ymm} />,
      },
      {
        content: <ValueCell value={ymm && <span className="no-drag">{ymm}</span>} emptyValue="" />,
      },
      {
        content: (
          <span className="no-drag" style={{ margin: '-4px -12px', padding: '4px 12px' }}>
            <ValueCell value={formattedLotId} emptyValue="" />
          </span>
        ),
      },
      {
        content: (
          <span className="no-drag d-b" style={{ margin: '-4px -12px', padding: '4px 12px' }}>
            {auction === AuctionService.auctionNames.COPART ? (
              <ClearVinCell lot={invoice?.lot} id={id} vin={vin} vinHash={vinHash} />
            ) : (
              <ValueCell value={vin} emptyValue="" />
            )}
          </span>
        ),
      },
      {
        content: (
          <span className="no-drag">
            {vehicleCategory && <VehicleCategoryCell vehicleCategory={vehicleCategory} />}
            {!vehicleCategory && <ValueCell value={vehicleType} emptyValue="" />}
          </span>
        ),
      },
      {
        content: (
          <ValueCell value={auctionFullName && <span className="no-drag">{auctionFullName}</span>} emptyValue="" />
        ),
      },
      {
        content: <ValueCell value={locationState && <span className="no-drag">{locationState}</span>} emptyValue="" />,
      },
      {
        content: <ValueCell value={portOfLoading && <span className="no-drag">{portOfLoading}</span>} emptyValue="" />,
      },
      {
        content: (
          <PortOfDestinationCell
            className="no-drag"
            portOfDestination={portOfDestination}
            vin={vin}
            shippingOrderToken={shippingOrderToken}
            shippingOrder={shippingOrder}
          />
        ),
      },
      {
        content: <AvailableDateCell className="no-drag" estDate={pickUpDateEst} actDate={pickUpDateAct} />,
      },
      {
        content: (
          <AvailableDateCell className="no-drag" estDate={deliveredToWarehouseEst} actDate={deliveredToWarehouseAct} />
        ),
      },
      {
        content: (
          <ValueCell
            value={
              shippingOrder ? (
                <>{ehTitleStatus && <span className="no-drag">{ehTitleStatus}</span>}</>
              ) : (
                <>
                  {titleStatus === LotService.TITLE_STATUS.AUCTION && (
                    <span className="no-drag">
                      <FormattedMessage id="shared.label.atAuction" />
                    </span>
                  )}
                </>
              )
            }
            emptyValue=""
          />
        ),
      },
      {
        content: <DateCell date={titleReceived} className="no-drag" />,
      },
      {
        content: (
          <ValueCell
            value={
              documents &&
              documents.map((doc, index) => (
                <div key={index}>
                  <span className="no-drag" style={{ margin: '-4px -12px', padding: '4px 12px' }}>
                    <Link href={doc.url} isTargetBlank>
                      {doc.name}
                    </Link>
                  </span>
                </div>
              ))
            }
            emptyValue=""
          />
        ),
      },
      {
        content: <ValueCell value={keys && <span className="no-drag">{keys}</span>} emptyValue="" />,
      },
      {
        content: (
          <NotesCell
            lotId={id}
            auction={auction}
            noteStats={currentNoteStats}
            invoiceCustomerId={invoiceCustomerId}
            isNoteStatsLoading={isNoteStatsLoading}
          />
        ),
      },
      {
        content: <DateCell date={departureDateFromUS} className="no-drag" />,
      },
      {
        content: <DateCell date={estDeliveryDate} className="no-drag" />,
      },
      {
        content: <ValueCell value={bookingId && <span className="no-drag">{bookingId}</span>} emptyValue="" />,
      },
      {
        content: (
          <span className="no-drag">
            <ContainerIdCell containerId={containerId} shippingLine={shippingLine} shippingLineUrl={shippingLineUrl} />
          </span>
        ),
      },
      {
        content: (
          <AmountCell className="no-drag" value={bidAmount} emptyValue="" hasCurrency={false} isFontWeightNormal />
        ),
      },
      {
        content: (
          <AmountCell className="no-drag" value={copartFees} emptyValue="" hasCurrency={false} isFontWeightNormal />
        ),
      },
      {
        content: (
          <AmountCell className="no-drag" value={transactionFee} emptyValue="" hasCurrency={false} isFontWeightNormal />
        ),
      },
      {
        content: (
          <AmountCell
            className="no-drag"
            value={documentationFee}
            emptyValue=""
            hasCurrency={false}
            isFontWeightNormal
          />
        ),
      },
      {
        content: (
          <AmountCell className="no-drag" value={storageFee} emptyValue="" hasCurrency={false} isFontWeightNormal />
        ),
      },
      ...(!brokerDisplayOnlyLotPurchase
        ? [
            {
              content: (
                <AmountCell
                  className="no-drag"
                  value={groundShipping}
                  emptyValue=""
                  hasCurrency={false}
                  isFontWeightNormal
                />
              ),
            },
            {
              content: (
                <AmountCell
                  className="no-drag"
                  value={oceanShipping}
                  emptyValue=""
                  hasCurrency={false}
                  isFontWeightNormal
                />
              ),
            },
            {
              content: (
                <AmountCell
                  className="no-drag"
                  value={paidAmount}
                  emptyValue=""
                  hasCurrency={false}
                  isFontWeightNormal
                />
              ),
            },
            {
              content: (
                <LotWonContextProvider invoice={invoice}>
                  <B2bShippingCell hasShippingActions />
                </LotWonContextProvider>
              ),
            },
          ]
        : []),
      { content: <PurchaseDueCell invoice={invoice} hasCurrency={false} isCompact /> },
    ].filter(Boolean);

    row.id = invoice.token;
    return row;
  });
}

export default getRowsArray;
