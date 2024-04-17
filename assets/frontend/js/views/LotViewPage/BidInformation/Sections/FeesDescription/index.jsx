import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotFeesShape from 'frontend/js/lib/propshapes/LotFeesShape';
import useBidFeeCalculator from 'frontend/js/hooks/useBidFeeCalculator';
import NumberService from 'frontend/js/lib/utils/NumberService';

const feeRow = (label, value, currency = 'USD', currencySymbol = '$') => (
  <div className="bid-information__fees-description-row is-small">
    <div>{label}</div>
    <div>
      {currencySymbol}
      {NumberService.formatNumber(value)}&nbsp;<span>{currency}</span>
    </div>
  </div>
);

function FeesDescription({ priceLabel, lot, fees, amount }) {
  const { currency, currencyFeeFormat, currencySymbol, inventoryAuction } = lot;
  const [isOpen, setOpen] = useState(false);
  const {
    copartAuctionFees,
    transactionFee,
    documentationFee,
    intlWirePaymentFee,
    hasStateTax,
    stateTax,
    surtax,
    gstFee,
    hstFee,
    totalFees,
    total,
  } = useBidFeeCalculator(fees, amount);
  const intl = useIntl();
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

  function toggleOpen() {
    setOpen(!isOpen);
  }

  const translationSets = {
    title: intl.formatMessage({
      id: 'lotPage.feeCalculator.title',
      defaultMessage: 'Fees Calculator',
    }),
    altClose: intl.formatMessage({
      id: 'lotPage.feeCalculator.altClose',
      defaultMessage: 'Close calculator',
    }),
    feeFinalBid: intl.formatMessage({
      id: 'shared.fee.finalBid',
      defaultMessage: 'Final Bid',
    }),
    feeHstTax: intl.formatMessage({
      id: 'shared.fee.hstTax',
      defaultMessage: 'HST tax',
    }),
    feeGstTax: intl.formatMessage({
      id: 'shared.fee.gstTax',
      defaultMessage: 'GST tax',
    }),
    feeCopartAuction: intl.formatMessage({
      id: 'shared.fee.copartAuction',
      defaultMessage: 'Auction Fees',
    }),
    feeAuction: intl.formatMessage({
      id: 'shared.fee.auctionFees',
    }),
    feeAbmTransaction: intl.formatMessage({
      id: 'shared.fee.abmTransaction',
      defaultMessage: 'Autobidmaster Transaction Fee',
    }),
    feeDocumentation: intl.formatMessage({
      id: 'shared.fee.documentation',
      defaultMessage: 'Documentation Fee',
    }),
    feeIntlWirePayment: intl.formatMessage({
      id: 'shared.fee.intlWirePayment',
      defaultMessage: 'International Wire Payment',
    }),
    feeStateSalesTax: intl.formatMessage(
      {
        id: 'shared.fee.stateSalesTax',
        defaultMessage: '{stateCode} Sales Tax',
      },
      {
        stateCode: fees.salesTaxState,
      },
    ),
    feeDiscretionarySurtax: intl.formatMessage({
      id: 'shared.fee.discretionarySurtax',
      defaultMessage: 'Discretionary Surtax',
    }),
    feeTotal: intl.formatMessage({
      id: 'shared.label.total',
      defaultMessage: 'Total',
    }),
    totalSalePrice: intl.formatMessage({
      id: 'shared.fee.totalSalePrice',
    }),
    labelFees: intl.formatMessage({
      id: 'shared.label.fees',
      defaultMessage: 'Fees',
    }),
    labelShow: intl.formatMessage({
      id: 'shared.label.show',
      defaultMessage: 'Show',
    }),
    labelHide: intl.formatMessage({
      id: 'shared.label.hide',
      defaultMessage: 'Hide',
    }),
  };

  const auctionFeesLabel =
    inventoryAuction === LotService.AUCTION_IAA ? translationSets.feeAuction : translationSets.feeCopartAuction;

  return (
    <div className="card-content__container">
      {!isAbmInventory && (
        <>
          <div className="bid-information__fees-description-caption">
            <div>
              <strong>{priceLabel}</strong>
            </div>
            <div>
              {currencySymbol}
              {NumberService.formatNumber(amount)} <span>{currency}</span>
            </div>
          </div>

          <div className="bid-information__fees-description-row is-caption">
            <div className={isOpen ? 'is-flipped' : ''}>
              {translationSets.labelFees} (
              <ButtonLink
                label={isOpen ? translationSets.labelHide : translationSets.labelShow}
                className="bid-information__show-hide-fees-button"
                onClick={toggleOpen}
              />
              )
            </div>
            <div>
              {currencySymbol}
              {NumberService.formatNumber(totalFees)}&nbsp;
              <span>{currencyFeeFormat}</span>
            </div>
          </div>

          {isOpen && (
            <>
              {hstFee > 0 && <>{feeRow(translationSets.feeHstTax, hstFee, currency, currencySymbol)}</>}

              {gstFee > 0 && <>{feeRow(translationSets.feeGstTax, gstFee, currency, currencySymbol)}</>}

              {feeRow(auctionFeesLabel, copartAuctionFees, currency, currencySymbol)}

              {feeRow(translationSets.feeAbmTransaction, transactionFee, currencyFeeFormat, currencySymbol)}

              {documentationFee > 0 && (
                <>{feeRow(translationSets.feeDocumentation, documentationFee, currencyFeeFormat, currencySymbol)}</>
              )}

              {intlWirePaymentFee > 0 && (
                <>{feeRow(translationSets.feeIntlWirePayment, intlWirePaymentFee, currencyFeeFormat, currencySymbol)}</>
              )}

              {hasStateTax === true && (
                <>
                  {stateTax > 0 && (
                    <>{feeRow(translationSets.feeStateSalesTax, stateTax, currencyFeeFormat, currencySymbol)}</>
                  )}

                  {surtax > 0 && (
                    <>{feeRow(translationSets.feeDiscretionarySurtax, surtax, currencyFeeFormat, currencySymbol)}</>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      <div className="bid-information__fees-description-total">
        <div>
          <strong>{translationSets.totalSalePrice}</strong>
        </div>
        <div className="bid-information__fees-description-total-price">
          <strong>
            {currencySymbol}
            {NumberService.formatNumber(total)}
          </strong>{' '}
          <span>{currencyFeeFormat}</span>
        </div>
      </div>
    </div>
  );
}

FeesDescription.propTypes = {
  priceLabel: PropTypes.string.isRequired,
  lot: LotShape.isRequired,
  fees: LotFeesShape.isRequired,
  amount: PropTypes.number,
  inventoryAuction: PropTypes.string,
};

FeesDescription.defaultProps = {
  amount: 0,
  inventoryAuction: '',
};

export default FeesDescription;
