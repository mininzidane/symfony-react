/* eslint-disable react/prop-types */
import React from 'react';
import { TableRow } from '@material-ui/core';
import useConsignmentContext from 'backend/js/views/Consignments/_Context/useConsignmentContext';
import CopartLogo from 'backend/js/views/_Shared/Micro/LotDescription/img/copartLogo.svg';
import TableCell from 'backend/js/components/Table/TableCell';
import Customer from 'backend/js/views/_Shared/Micro/Customer';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import RouterService from 'backend/js/api/RouterService';
import CopartCharges from 'backend/js/views/Consignments/ConsignmentTable/ConsignmentRow/CopartCharges';
import CopyButton from 'backend/js/components/CopyButton';
import BidApprovalStatus from './BidApprovalStatus';
import Vehicle from './Vehicle';
import ConsignmentNotes from './ConsignmentNotes';
import CopartLocation from './CopartLocation';
import LotStatus from './LotStatus';
import Rerun from './Rerun';
import Actions from './Actions';

function ConsignmentRow({ consignment, updateConsignment }) {
  const { queryParams } = useConsignmentContext();

  if (!consignment) {
    return null;
  }

  const timeLeftDays = consignment?.instantOffer?.paymentDate
    ? DateTimeService.getTimeLeft(new Date(), new Date(consignment.instantOffer.paymentDate))?.days
    : null;
  const shippingPrice = consignment?.instantOffer?.shippingPrice || consignment?.instantOffer?.nearestLocationQuote;
  const difference = consignment.currentBid - shippingPrice - (consignment.instantOffer?.offerAmount || 0);

  return (
    <TableRow>
      {queryParams?.sale_type !== 'SYC' && (
        <TableCell className="customer">
          <Customer
            customer={consignment.customer}
            bid={consignment}
            category={ConsignmentService.CATEGORY_TEMPLATE}
            showLocalTime
            showLocale
          />
        </TableCell>
      )}
      <TableCell>
        <div className="text-center">
          {consignment.agreements.length > 0 ? (
            <a href={consignment.agreements[0].s3Url} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-check" style={{ color: 'green' }} />
            </a>
          ) : (
            <i className="fa fa-remove" style={{ color: 'red' }} />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="ws-n">
          <a
            href={RouterService.getRoute('copartLotPage', null, { id: consignment.copartLot })}
            target="_blank"
            rel="noreferrer"
          >
            {consignment.copartLot}
          </a>
          <CopyButton value={consignment.copartLot} />
        </div>
        {consignment.instantOffer && (
          <>
            &nbsp;
            <a
              href={RouterService.getRoute('instantOffersList', {
                instant_offer_tabs: 'ready_for_sale',
                ref_or_vin_or_lot: consignment.vin,
              })}
              className="badge badge-success"
            >
              SYC
            </a>
          </>
        )}
        &nbsp;
        <a
          href={`https://seller.copart.com/lotdisplay/${consignment.copartLot}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={CopartLogo} alt="Copart Logo" width="16px" height="16px" />
        </a>
      </TableCell>
      <TableCell>
        <Vehicle consignment={consignment} />
      </TableCell>
      <TableCell>
        <CopartLocation location={consignment.copartLocation} />
      </TableCell>
      <TableCell>
        <LotStatus
          id={consignment.id}
          lotId={consignment.copartLot}
          status={consignment.lotStatus}
          ymm={`${consignment.year} ${consignment.make} ${consignment.model}`}
        />
      </TableCell>
      <TableCell>{consignment.auctionDate && DateTimeService.formatFromISOString(consignment.auctionDate)}</TableCell>
      <TableCell>
        <Rerun consignment={consignment} />
      </TableCell>
      <TableCell>
        {consignment.reserveAmount > 0 && <div>{NumberService.formatCurrency(consignment.reserveAmount)}</div>}
        {consignment.proQuote && <div>ProQuote: {NumberService.formatCurrency(consignment.proQuote)}</div>}
      </TableCell>
      <TableCell>
        {consignment.instantOffer && (
          <small className="text-muted">
            {consignment.instantOffer.paymentDate && (
              <>
                Payment date: {DateTimeService.formatFromISOString(consignment.instantOffer.paymentDate)}
                <br />
              </>
            )}
            {consignment.instantOffer.offerAmount && (
              <>
                Payment: {NumberService.formatCurrency(consignment.instantOffer.offerAmount, 'USD', true)}
                <br />
              </>
            )}
            {shippingPrice && (
              <>
                Shipping: {NumberService.formatCurrency(shippingPrice, 'USD', true)}
                <br />
              </>
            )}
            {consignment.instantOffer.paymentDate && timeLeftDays !== null && (
              <span style={{ color: 'red' }} title="Is calculating from payment date and today's date.">
                Days in stock: {timeLeftDays} day{timeLeftDays > 1 ? 's' : ''}
              </span>
            )}
          </small>
        )}
      </TableCell>
      <TableCell>
        <span style={{ color: difference >= 0 ? 'green' : 'red' }}>
          {difference ? NumberService.formatCurrency(difference, 'USD', true) : ''}
        </span>
      </TableCell>
      <TableCell>
        <div>
          <span style={{ color: 'green' }}>{NumberService.formatCurrency(consignment.currentBid || 0)}</span>
          <small className="text-muted">
            <br />
            Proceeds: {NumberService.formatCurrency(consignment.billingTotalProceeds / 100, 'USD', true)}
            <br />
            Due Copart: {NumberService.formatCurrency(consignment.billingDueCopart / 100, 'USD', true)}
          </small>
        </div>
      </TableCell>
      <TableCell>
        {consignment.awaitingApprovalStatus && (
          <>
            <BidApprovalStatus status={consignment.bidApprovalStatus} />
            <Actions consignment={consignment} updateConsignment={updateConsignment} />
          </>
        )}
        <small className="text-muted">
          Copart Advance Charges: {NumberService.formatCurrency(consignment.billingTotalAdvances / 100, 'USD', true)}
          <br />
          <CopartCharges consignment={consignment} />
          <br />
          Seller Payments: {NumberService.formatCurrency(consignment.billingPaidBySeller / 100, 'USD', true)}
        </small>

        {consignment.currentBid && !consignment.instantOffer && (
          <div className="mt-10">
            <small style={{ fontWeight: 600 }}>
              Sale amount: {NumberService.formatCurrency(consignment.currentBid)}
              <br />
              Consignment fee: {NumberService.formatCurrency(consignment.consignmentAuctionFee / 100, 'USD', true)}
              <br />
              Reruns fee ({consignment.paidReRunCount} runs):{' '}
              {NumberService.formatCurrency(consignment.reRunFee / 100, 'USD', true)}
              <br />
              Transaction fee: {NumberService.formatCurrency(consignment.transactionFee / 100, 'USD', true)}
              <br />
              Sale fee: {NumberService.formatCurrency(consignment.saleFee / 100, 'USD', true)}
              <br />
              Storage fee: {NumberService.formatCurrency(consignment.storageFee / 100, 'USD', true)}
              <br />
              Shipping price: {NumberService.formatCurrency(consignment.shippingPrice / 100, 'USD', true)}
              <br />
              Fees: {NumberService.formatCurrency(consignment.feesAmount / 100, 'USD', true)}
              <br />
              Payout Est: {NumberService.formatCurrency(consignment.payoutEstimate / 100, 'USD', true)}
              <br />
            </small>
          </div>
        )}
      </TableCell>
      <TableCell>
        <ConsignmentNotes consignment={consignment} notes={consignment.customerNotes} />
      </TableCell>
    </TableRow>
  );
}

export default ConsignmentRow;
